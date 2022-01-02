import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../db/db';

export interface ICountdown {
  id: string;
  dateCreated: Date;
  dateDue: Date;
  name?: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ICountdown | ICountdown[]>
) {
  if (req.method === 'POST') {
    // Create/save a countdown
    const countdownToBeCreated = req.body as ICountdown;
    const countdownCreated = saveCountdown(countdownToBeCreated);
    if (countdownCreated != null) {
      console.log(`Created countdown with ID ${countdownCreated.id}`);
      res.status(200).json(countdownCreated);
    }
  } else if (req.method === 'GET') {
    if (req.query.id != null) {
      // Get a countdown by ID
      const countdownId = req.query.id as string;
      const countdown = getCountdownById(countdownId);
      if (countdown != null) {
        console.log(`Retrieved countdown with ID ${countdown.id}`);
        res.status(200).json(countdown);
      } else {
        res.status(400);
      }
    } else {
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
}

const saveCountdown = (countdown: ICountdown): ICountdown | undefined => {
  // TODO: Check constraints: Name length, dateDue before dateCreate, ID does not exist
  db.push(`/countdowns/${countdown.id}`, countdown);
  return countdown;
};

export function getCountdownById(id: string): ICountdown | undefined {
  db.reload();
  try {
    return db.getObject<ICountdown>(`/countdowns/${id}`);
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

function getLastNCountdowns(n: number): ICountdown[] {
  db.reload();
  const data = db.getData(`/countdowns`);
  const countdowns = Object.values(data).map((it) => it as ICountdown);
  return countdowns.slice(n * -1).reverse();
}
