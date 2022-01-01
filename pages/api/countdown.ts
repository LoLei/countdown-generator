import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../db/db';
import { ICountdown } from '../../lib/countdown';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ICountdown>
) {
  if (req.method === 'POST') {
    const countdownToBeCreated = req.body as ICountdown;
    const countdownCreated = saveCountdown(countdownToBeCreated);
    if (countdownCreated != null) {
      res.status(200).json(countdownCreated);
    }
  }
}

const saveCountdown = (countdown: ICountdown): ICountdown | undefined => {
  // TODO: Check constraints: Name length, dateDue before dateCreate, ID does not exist
  db.push(`/countdowns/${countdown.id}`, countdown);
  return countdown;
};
