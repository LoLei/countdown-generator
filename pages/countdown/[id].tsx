import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import React from 'react';
import {
  getAllCountdownIds,
  getCountdownById,
  ICountdown,
} from '../../lib/countdown';
import { Card, Container, createStyles, Group, Text } from '@mantine/core';
import { formatDate } from '../../lib/dates';
import Countdown from 'react-countdown';
import { MdOutlineCelebration } from 'react-icons/md';

const useStyles = createStyles({
  container: {
    width: '100%',
  },
  completionIcon: {
    transform: 'translateY(0.125rem)',
  },
});

const Completionist = () => {
  const { classes } = useStyles();
  return (
    <Text size="lg" weight={500} align="center">
      Countdown completed!{' '}
      <MdOutlineCelebration className={classes.completionIcon} />
    </Text>
  );
};

const CountdownPartText = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text
      size="xl"
      style={{ fontFamily: 'Roboto Mono, monospace' }}
      weight={700}
    >
      {children}
    </Text>
  );
};

const CountdownRenderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}) => {
  if (completed) {
    return <Completionist />;
  } else {
    return (
      <>
        {days > 0 && <CountdownPartText>{days}d :</CountdownPartText>}
        {<CountdownPartText>{hours}h :</CountdownPartText>}
        {<CountdownPartText>{minutes}m :</CountdownPartText>}
        {<CountdownPartText>{seconds}s</CountdownPartText>}
      </>
    );
  }
};

const TitleText = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <Text
      variant="gradient"
      gradient={{ from: 'orange', to: 'red', deg: 45 }}
      size="lg"
      weight={700}
      style={{ fontFamily: 'Roboto Condensed, sans-serif' }}
      align="center"
    >
      {children}
    </Text>
  );
};

const CountdownPage = (props: IProps): JSX.Element => {
  const { classes } = useStyles();

  return (
    <>
      <Head>
        <title>
          {props.countdown.name
            ? props.countdown.name
            : 'Countdown ID ' + props.countdown.id}
        </title>
      </Head>

      <Container className={classes.container} size="sm">
        <Group position="center" direction="column" grow>
          <Card shadow="sm" padding="sm">
            <Group position="center" direction="column" spacing="xs">
              {props.countdown.name ? (
                <TitleText>{props.countdown.name}</TitleText>
              ) : (
                <TitleText>Countdown ID: {props.countdown.id}</TitleText>
              )}
              <Text>Created at: {formatDate(props.countdown.dateCreated)}</Text>
              <Text>Due at: {formatDate(props.countdown.dateDue)}</Text>
            </Group>
          </Card>
          <Card padding="xs">
            <Group position="center" direction="row" spacing="xs">
              <Countdown
                date={props.countdown.dateDue}
                renderer={CountdownRenderer}
              />
            </Group>
          </Card>
        </Group>
      </Container>
    </>
  );
};

interface IProps {
  countdown: ICountdown;
}

export default CountdownPage;

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllCountdownIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: GetServerSidePropsContext) {
  // Fetch necessary data for the countdown using params.id
  const id = context.params?.id;
  if (id == null) {
    return {
      notFound: true,
    };
  }
  const countdown = getCountdownById(id as string);
  return {
    props: {
      countdown,
    },
  };
}
