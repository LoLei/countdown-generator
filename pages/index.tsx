import React from 'react';
import { Button, Card, Container, Paper, Text, Title } from '@mantine/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Countdown Generator</title>
      </Head>

      <header className={styles.header}>
        <Title order={2}>Countdown Generator</Title>
      </header>

      <main className={styles.main}>
        <Container>
          <Card>Test Card</Card>
          <Button>Create Countdown</Button>
          <Paper>Test Paper</Paper>
        </Container>
      </main>

      <footer className={styles.footer}>
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
