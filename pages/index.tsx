import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import { Button } from '@mantine/core';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Countdown</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <span>header</span>
      </header>

      <main className={styles.main}>
        <Button>Create Countdown</Button>
      </main>

      <footer className={styles.footer}>
        <a href="https://lolei.dev" target="_blank" rel="noopener noreferrer">
          Powered by &lt;3
        </a>
      </footer>
    </>
  );
};

export default Home;
