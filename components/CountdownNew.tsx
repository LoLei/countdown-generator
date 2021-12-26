import { Button, Card, createStyles, Group, Title } from '@mantine/core';
import React from 'react';

const useStyles = createStyles({
  titleNew: {
    textAlign: 'center',
  },
});

const CountdownNew = (): JSX.Element => {
  const { classes } = useStyles();

  return (
    <Card shadow="sm" padding="sm">
      <Group position="center" direction="column" spacing="xs">
        <Title className={classes.titleNew} order={4}>
          New Countdown
        </Title>
        <Button variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
          Create Countdown
        </Button>
      </Group>
    </Card>
  );
};

export default CountdownNew;
