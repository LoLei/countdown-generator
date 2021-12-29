import { Card, createStyles, Table, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Link from 'next/link';
import React from 'react';
import { mobileMediaQueryWidth } from '../lib/consts';
import { mockCountdowns } from '../lib/countdown';
import { formatDate } from '../lib/dates';
import { getTruncatedString } from '../lib/strings';

const useStyles = createStyles({
  titleOld: {
    textAlign: 'center',
  },
});

const CountdownsOld = (): JSX.Element => {
  const { classes } = useStyles();
  const isMobile = useMediaQuery(`(max-width: ${mobileMediaQueryWidth})`);

  function Td({ children, to }: { children: React.ReactNode; to?: string }) {
    // Conditionally wrapping content into a link
    if (to) {
      return (
        <td>
          <Link href={to} passHref>
            <a>{children}</a>
          </Link>
        </td>
      );
    } else {
      return <div>{children}</div>;
    }
  }

  return (
    <Card shadow="sm" padding="sm">
      <Title className={classes.titleOld} order={4}>
        Old Countdowns
      </Title>

      <Table highlightOnHover>
        <thead>
          <tr>
            <th>ID/Name</th>
            <th>Due name</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {mockCountdowns.map((it, idx) => {
            return (
              <tr key={idx}>
                <Td to={`/countdown/${it.id}`}>
                  {it.name
                    ? getTruncatedString(it.name, isMobile ? 6 : 50)
                    : it.id}
                </Td>
                <td>{formatDate(it.dateDue)}</td>
                <td>TODO</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Card>
  );
};

export default CountdownsOld;
