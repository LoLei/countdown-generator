export interface ICountdown {
  id: string;
  dateCreated: Date;
  dateDue: Date;
  name?: string;
}

export const mockCountdowns: ICountdown[] = [
  {
    id: 'id5xyz',
    dateCreated: new Date('2021-12-30T01:00:00Z'),
    dateDue: new Date('2022-02-01T12:00:00Z'),
    name: 'A Test Countdown',
  },
  {
    id: 'id4',
    dateCreated: new Date('2021-12-28T00:00:00Z'),
    dateDue: new Date('2022-03-01T00:00:00Z'),
    name: 'Countdown with really long name so long it will be truncated at some places that do not have enough space',
  },
  {
    id: 'id3',
    dateCreated: new Date('2021-12-28T00:00:00Z'),
    dateDue: new Date('2022-03-01T00:00:00Z'),
    name: 'My March 1 Countdown',
  },
  {
    id: 'id2',
    dateCreated: new Date('2021-04-11T10:20:30Z'),
    dateDue: new Date('2021-04-12T10:20:30Z'),
  },
  {
    id: 'id1',
    dateCreated: new Date('2011-04-11T10:20:30Z'),
    dateDue: new Date('2011-04-12T10:20:30Z'),
  },
];

export function getAllCountdownIds() {
  return mockCountdowns.map((countdown) => {
    return {
      params: {
        id: countdown.id,
      },
    };
  });
}

export function getCountdownById(id: string): ICountdown | undefined {
  const res = mockCountdowns.find((it) => it.id === id);
  return res;
}
