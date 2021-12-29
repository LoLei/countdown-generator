import { Card, createStyles, Text, Title } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { mockCountdowns } from '../lib/countdown';
import { formatDate } from '../lib/dates';

const useStyles = createStyles({
  titleOld: {
    textAlign: 'center',
  },
});

const CountdownsOld = (): JSX.Element => {
  const { classes } = useStyles();

  return (
    <Card shadow="sm" padding="sm">
      <Title className={classes.titleOld} order={4}>
        Old Countdowns
      </Title>
      <ul>
        {mockCountdowns.map((it, idx) => {
          return (
            <li key={idx}>
              <Link href={`/countdown/${it.id}`} passHref>
                <Text component="a">Due: {formatDate(it.dateDue)}</Text>
              </Link>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default CountdownsOld;
