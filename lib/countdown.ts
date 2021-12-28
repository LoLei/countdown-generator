export interface ICountdown {
  id: number;
  dateCreated: Date;
  dateDue: Date;
  name?: string;
}

export const mockCountdowns: ICountdown[] = [
  {
    id: 1,
    dateCreated: new Date('2011-04-11T10:20:30Z'),
    dateDue: new Date('2011-04-12T10:20:30Z'),
  },
  {
    id: 2,
    dateCreated: new Date('2021-04-11T10:20:30Z'),
    dateDue: new Date('2021-04-12T10:20:30Z'),
  },
  {
    id: 3,
    dateCreated: new Date('2021-12-28T00:00:00Z'),
    dateDue: new Date('2022-03-01T00:00:00Z'),
    name: 'My March 1 Countdown',
  },
];

export function getAllCountdownIds() {
  return mockCountdowns.map((countdown) => {
    return {
      params: {
        id: countdown.id.toString(),
      },
    };
  });
}

export function getCountdownById(id: number): ICountdown | undefined {
  const res = mockCountdowns.find((it) => it.id === id);
  return res;
}
