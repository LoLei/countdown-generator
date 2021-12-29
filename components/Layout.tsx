import { createStyles, Text, Title } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { AiFillGithub } from 'react-icons/ai';

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
  footerIcon: {
    transform: 'translateY(0.125rem)',
  },
});

const Layout = (props: IProps): JSX.Element => {
  const { classes } = useStyles();

  return (
    <>
      <header className={classes.header}>
        <Link href="/">
          <a>
            <Title order={2}>Countdown Generator</Title>
          </a>
        </Link>
      </header>

      <main className={classes.main}>{props.children}</main>

      <footer className={classes.footer}>
        <Text
          component="a"
          href="https://github.com/LoLei/countdown-generator"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillGithub className={classes.footerIcon} /> Source
        </Text>
      </footer>
    </>
  );
};

export default Layout;

interface IProps {
  children: React.ReactNode;
}
