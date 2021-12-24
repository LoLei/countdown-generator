import {
  Button,
  Card,
  Container,
  createStyles,
  Paper,
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
  footer: {
    minHeight: '1rem',
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

      <header className={classes.header}>
        <Title order={2}>Countdown Generator</Title>
      </header>

      <main className={classes.main}>
        <Container>
          <Card>Test Card</Card>
          <Button>Create Countdown</Button>
          <Paper>Test Paper</Paper>
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
