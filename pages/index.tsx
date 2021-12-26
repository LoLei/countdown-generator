import { Container, createStyles, Group } from '@mantine/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import CountdownNew from '../components/CountdownNew';
import CountdownsOld from '../components/CountdownsOld';

const useStyles = createStyles({
  container: {
    width: '100%',
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
          <CountdownNew />
          <CountdownsOld />
        </Group>
      </Container>
    </>
  );
};

export default Home;
