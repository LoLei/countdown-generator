import { createStyles, Title, Text } from '@mantine/core';
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

const Layout = (props: IProps): JSX.Element => {
  const { classes } = useStyles();

  return (
    <>
      <header className={classes.header}>
        <Title order={2}>Countdown Generator</Title>
      </header>

      <main className={classes.main}>{props.children}</main>

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

export default Layout;

interface IProps {
  children: React.ReactNode;
}