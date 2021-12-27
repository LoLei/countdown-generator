import { Button, Card, createStyles, Group, Modal, Title } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import React, { useState } from 'react';

const useStyles = createStyles({
  titleNew: {
    textAlign: 'center',
  },
});

const CountdownNew = (): JSX.Element => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [dateValue, onDateValueChange] = useState<Date | undefined>(new Date());
  const { classes } = useStyles();

  return (
    <>
      <Card shadow="sm" padding="sm">
        <Group position="center" direction="column" spacing="xs">
          <Title className={classes.titleNew} order={4}>
            New Countdown
          </Title>
          <Button
            variant="gradient"
            gradient={{ from: 'orange', to: 'red' }}
            onClick={() => setModalOpen(true)}
          >
            Create Countdown
          </Button>
        </Group>
      </Card>
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create a new countdown"
        centered
      >
        <DatePicker
          value={dateValue}
          onChange={(d) => onDateValueChange(d || undefined)}
          label="Due date"
          minDate={new Date()}
          required
          clearable={false}
        />
        <Button variant="light">Create</Button>
      </Modal>
    </>
  );
};

export default CountdownNew;
