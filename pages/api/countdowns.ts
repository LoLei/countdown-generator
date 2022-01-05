import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../db/db';
import { ICountdown } from '../../types/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ICountdown[]>
) {
  if (req.method === 'GET') {
    // Get the last n countdowns
    const lastCountdowns = getLastNCountdowns(5);
    console.log(
      `Retrieved countdowns with IDs ${lastCountdowns
        .map((it) => it.id)
        .join(',')}`
    );
    res.status(200).json(lastCountdowns);
  }
}

function getLastNCountdowns(n: number): ICountdown[] {
  db.reload();
  const data = db.getData(`/countdowns`);
  const countdowns = Object.values(data).map((it) => it as ICountdown);
  return countdowns.slice(n * -1).reverse();
}
