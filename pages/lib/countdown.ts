export interface ICountdown {
  id: number;
  dateCreated: Date;
  dateDue: Date;
}

const mockCountdowns: ICountdown[] = [
  {
    id: 1,
    dateCreated: new Date('2011-04-11T10:20:30Z'),
    dateDue: new Date('2011-04-12T10:20:30Z'),
  },
  {
    id: 2,
    dateCreated: new Date('2021-04-11T10:20:30Z'),
    dateDue: new Date('2012-04-12T10:20:30Z'),
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
  console.debug({ id });
  const res = mockCountdowns.find((it) => it.id === id);
  console.debug({ res });
  return res;
}
