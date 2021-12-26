import React from 'react';
import {
  Button,
  Card,
  Container,
  createStyles,
  Group,
  Text,
  Title,
} from '@mantine/core';
import type { NextPage } from 'next';
import Head from 'next/head';

const useStyles = createStyles({
  container: {
    width: '100%',
  },
  titleNew: {
    textAlign: 'center',
  },
  titleOld: {
    textAlign: 'center',
  },
});

interface ICountdown {
  dateCreated: Date;
  dateDue: Date;
}

/**
 * Mock data for now
 */
const otherCountdowns: ICountdown[] = [
  {
    dateCreated: new Date('2011-04-11T10:20:30Z'),
    dateDue: new Date('2011-04-12T10:20:30Z'),
  },
  {
    dateCreated: new Date('2021-04-11T10:20:30Z'),
    dateDue: new Date('2012-04-12T10:20:30Z'),
  },
];

const Home: NextPage = () => {
  const { classes } = useStyles();

  return (
    <>
      <Head>
        <title>Countdown Generator</title>
      </Head>

      <Container className={classes.container} size="sm">
        <Group position="center" direction="column" grow>
          <Card shadow="sm" padding="sm">
            <Group position="center" direction="column" spacing="xs">
              <Title className={classes.titleNew} order={4}>
                New Countdown
              </Title>
              <Button
                variant="gradient"
                gradient={{ from: 'orange', to: 'red' }}
              >
                Create Countdown
              </Button>
            </Group>
          </Card>
          <Card shadow="sm" padding="sm">
            <Title className={classes.titleOld} order={4}>
              Old Countdowns
            </Title>
            {otherCountdowns.map((it, idx) => {
              return (
                <Text key={idx}>
                  Created: {it.dateCreated.toDateString()}, due:{' '}
                  {it.dateDue.toDateString()}
                </Text>
              );
            })}
          </Card>
        </Group>
      </Container>
    </>
  );
};

export default Home;
