import { Card, createStyles, Table, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
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
