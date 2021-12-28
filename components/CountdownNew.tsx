import { Button, Card, Group, Modal, Title } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import React, { useEffect, useState } from 'react';
import { AiOutlineCalendar, AiOutlineClockCircle } from 'react-icons/ai';

const CountdownNew = (): JSX.Element => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [dateValue, onDateValueChange] = useState<Date | undefined>(new Date());
  const [timeValue, onTimeValueChange] = useState<Date | undefined>(new Date());
  const [timeError, setTimeError] = useState<string>('');

  useEffect(() => {
    const dateNow = new Date();
    console.log({ dateNow });
    console.log({ dateValue });
    console.log({ timeValue });
    // TODO: Set error if date & time is before now
  }, [dateValue, timeValue]);

  return (
    <>
      <Card shadow="sm" padding="sm">
        <Group position="center" direction="column" spacing="xs">
          <Title order={4}>New Countdown</Title>
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
          icon={<AiOutlineCalendar />}
        />
        <TimeInput
          value={timeValue}
          onChange={onTimeValueChange}
          label="Due time"
          required
          icon={<AiOutlineClockCircle />}
          withSeconds
          invalid={timeError !== ''}
          error={timeError}
        />
        <Button variant="light" color="orange">
          Create
        </Button>
      </Modal>
    </>
  );
};

export default CountdownNew;
