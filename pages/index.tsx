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
import { mockCountdowns } from '../lib/countdown';
import Link from 'next/link';

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
            <ul>
              {mockCountdowns.map((it, idx) => {
                return (
                  <li key={idx}>
                    <Link href={`/countdown/${it.id}`} passHref>
                      <Text component="a">
                        Created: {it.dateCreated.toDateString()}, due:{' '}
                        {it.dateDue.toDateString()}
                      </Text>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Card>
        </Group>
      </Container>
    </>
  );
};

export default Home;
