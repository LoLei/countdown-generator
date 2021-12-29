import { Card, createStyles, Table, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
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
  const router = useRouter();

  useEffect(() => {
    // Since next/link does not work well with an entire table row,
    // prefetch the resources here so they are already loaded when
    // router.push is called
    mockCountdowns.forEach((it) => {
      router.prefetch(`/countdown/${it.id}`);
    });
  }, [router]);

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
              <tr key={idx} onClick={() => router.push(`/countdown/${it.id}`)}>
                <td>
                  {it.name
                    ? getTruncatedString(it.name, isMobile ? 6 : 50)
                    : it.id}
                </td>
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
