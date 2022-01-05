import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../db/db';
import { ICountdown } from '../../types/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ICountdown | undefined>
) {
  if (req.method === 'GET') {
    if (req.query.id != null) {
      // Get a countdown by ID
      const countdownId = req.query.id as string;
      const countdown = getCountdownById(countdownId);
      if (countdown != null) {
        console.log(`Retrieved countdown with ID ${countdown.id}`);
        res.status(200).json(countdown);
      } else {
        res.status(404).send(undefined);
      }
    }
  }
}

export function getCountdownById(id: string): ICountdown | undefined {
  db.reload();
  try {
    return db.getObject<ICountdown>(`/countdowns/${id}`);
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
