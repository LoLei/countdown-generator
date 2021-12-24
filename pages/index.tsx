import { Button, Card, Container, Paper, Text } from '@mantine/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Countdown</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <Text>This is the header</Text>
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
