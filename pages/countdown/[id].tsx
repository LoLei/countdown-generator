import { GetServerSidePropsContext } from 'next';
import React from 'react';
import {
  getAllCountdownIds,
  getCountdownById,
  ICountdown,
} from '../lib/countdown';

const CountdownPage = (props: IProps): JSX.Element => {
  return (
    <>
      {props.countdown.id}
      {props.countdown.dateCreated}
      {props.countdown.dateDue}
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
  const countdown = getCountdownById(parseInt(id as string));
  return {
    props: {
      countdown,
    },
  };
}
