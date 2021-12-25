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
import React from 'react';

const useStyles = createStyles({
  header: {
    minHeight: '1rem',
    textAlign: 'center',
    paddingTop: '0.5rem',
  },
  main: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    width: '100%',
  },
  footer: {
    minHeight: '1rem',
    textAlign: 'center',
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

      <header className={classes.header}>
        <Title order={2}>Countdown Generator</Title>
      </header>

      <main className={classes.main}>
        <Container className={classes.mainContainer} size="sm">
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
      </main>

      <footer className={classes.footer}>
        <Text
          component="a"
          href="https://lolei.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by &lt;3
        </Text>
      </footer>
    </>
  );
};

export default Home;
