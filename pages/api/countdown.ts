import dayjs from 'dayjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../db/db';
import { ICountdown } from '../../types/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ICountdown | undefined>
) {
  if (req.method === 'POST') {
    // Create/save a countdown
    const countdownToBeCreated = req.body as ICountdown;
    const countdownCreated = saveCountdown(countdownToBeCreated);
    if (countdownCreated != null) {
      console.log(`Created countdown with ID ${countdownCreated.id}`);
      res.status(200).json(countdownCreated);
    } else {
      res.status(400).send(undefined);
    }
  }
}

const saveCountdown = (countdown: ICountdown): ICountdown | undefined => {
  // Check constraints that should also be validated on the frontend,
  // but need to be checked here again in case the API itself is used.

  // Check name length
  const maxLength = 75;
  if (countdown.name && countdown.name?.length > maxLength) {
    return undefined;
  }

  // Check due date is not before creation date
  if (dayjs(countdown.dateDue).isBefore(countdown.dateCreated)) {
    return undefined;
  }

  // Check ID does not already exist
  if (db.exists(`/countdowns/${countdown.id}`)) {
    return undefined;
  }

  db.push(`/countdowns/${countdown.id}`, countdown);
  return countdown;
};
