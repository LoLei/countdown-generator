import { Card, createStyles, Table, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { IoHourglassOutline } from 'react-icons/io5';
import { mobileMediaQueryWidth } from '../lib/consts';
import { formatDate } from '../lib/dates';
import { getTruncatedString } from '../lib/strings';
import { ICountdown } from '../pages/api/countdown';

const useStyles = createStyles({
  titleOld: {
    textAlign: 'center',
  },
  tableDataRow: {
    cursor: 'pointer',
  },
});

const CountdownsOld = (): JSX.Element => {
  const { classes } = useStyles();
  const isMobile = useMediaQuery(`(max-width: ${mobileMediaQueryWidth})`);
  const router = useRouter();
  const maxNumberOldCountdowns = 5;
  const currentDate = new Date();
  const [countdowns, setCountdowns] = useState<ICountdown[]>([]);

  useEffect(() => {
    // Since next/link does not work well with an entire table row,
    // prefetch the resources here so they are already loaded when
    // router.push is called
    fetch('/api/countdown') // Gets the last n countdowns
      .then((r) => r.json())
      .then((countdowns: ICountdown[]) => {
        setCountdowns(countdowns);
        countdowns.forEach((it) => {
          router.prefetch(`/countdown/${it.id}`);
        });
      })
      .catch((e) => console.error(e));
  }, [router]);

  return (
    <Card shadow="sm" padding="sm">
      <Title className={classes.titleOld} order={4}>
        Old Countdowns
      </Title>

      <Table highlightOnHover captionSide="bottom">
        <caption>
          Last {maxNumberOldCountdowns} countdowns. Click to visit.
        </caption>
        <thead>
          <tr>
            <th>ID/Name</th>
            <th>Due date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {countdowns.map((it, idx) => {
            // May need to sort countdowns by date if they do not come already sorted
            return (
              <tr
                key={idx}
                className={classes.tableDataRow}
                onClick={() => router.push(`/countdown/${it.id}`)}
              >
                <td>
                  {it.name
                    ? getTruncatedString(it.name, isMobile ? 6 : 50)
                    : it.id}
                </td>
                <td>{formatDate(it.dateDue)}</td>
                <td>
                  {
                    // Could do this periodically, but not really necessary
                    dayjs(it.dateDue).isBefore(currentDate) ? (
                      <IoIosCheckmarkCircleOutline />
                    ) : (
                      <IoHourglassOutline />
                    )
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Card>
  );
};

export default CountdownsOld;
