import {
  Button,
  Card,
  createStyles,
  Group,
  Modal,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { useMediaQuery } from '@mantine/hooks';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { AiOutlineCalendar, AiOutlineClockCircle } from 'react-icons/ai';
import { mobileMediaQueryWidth } from '../lib/consts';
import { ICountdown } from '../pages/api/countdown';

const useStyles = createStyles({
  submitButtonContainer: {
    width: '100%',
    textAlign: 'center',
  },
  submitButton: {
    marginTop: '1rem',
  },
});

/**
 * @returns The current date but with time set to 0
 */
const getLastMidnight = (): Date => {
  const dateNow = new Date();
  dateNow.setHours(0);
  dateNow.setMinutes(0);
  dateNow.setSeconds(0);
  return dateNow;
};

/**
 * @returns The current date but with the hour set to +1 and minutes and seconds set to 0
 */
const getNextHour = (): Date => {
  const dateNow = dayjs(new Date());
  return dateNow.add(1, 'hour').set('minute', 0).set('second', 0).toDate();
};

const CountdownNew = (): JSX.Element => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [dateValue, onDateValueChange] = useState<Date | undefined>(
    getLastMidnight()
  );
  const [timeValue, onTimeValueChange] = useState<Date | undefined>(
    getNextHour()
  );
  const [dateError, setDateError] = useState<boolean>(false);
  const dateErrorMessage = 'Due date cannot be before current date';
  const [combinedDueDate, setCombinedDueDate] = useState<Date | undefined>();
  const [name, setName] = useState<string | undefined>();
  const [nameError, setNameError] = useState<boolean>(false);
  const nameMaxLength = 75;
  const nameErrorMessage = `Name can have a maximum of ${nameMaxLength} characters`;
  const canSubmit = !dateError && !nameError;
  const isMobile = useMediaQuery(`(max-width: ${mobileMediaQueryWidth})`);
  const { classes } = useStyles();

  useEffect(() => {
    setDateError(false);

    const dateNow = new Date();
    const combined = dayjs(dateValue)
      .add(timeValue?.getHours() || 0, 'hour')
      .add(timeValue?.getMinutes() || 0, 'minute')
      .add(timeValue?.getSeconds() || 0, 'second');

    if (combined.isBefore(dateNow)) {
      setDateError(true);
    } else {
      setCombinedDueDate(combined.toDate());
    }
  }, [dateValue, timeValue]);

  useEffect(() => {
    if (name && name.length > nameMaxLength) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  }, [name]);

  const onSubmitCreation = async () => {
    const createdCountdown: ICountdown = {
      // TODO: Check for existing IDs to avoid collision (in backend)
      id: nanoid(6),
      dateCreated: new Date(),
      dateDue: combinedDueDate!,
      name: name,
    };

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    await fetch('/api/countdown', {
      method: 'POST',
      body: JSON.stringify(createdCountdown),
      headers: myHeaders,
    });

    // TODO: Check again if the created countdown is not before the current time,
    //  as the form may have been left idle for a while
    // TODO: Save to DB and redirect to page or show link to page
  };

  return (
    <>
      <Card shadow="sm" padding="sm">
        <Group position="center" direction="column" spacing="xs">
          <Title order={4}>New Countdown</Title>
          <Text>Create a new countdown which is saved and can be shared.</Text>
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
          dropdownType={isMobile ? 'modal' : 'popover'}
        />
        <TimeInput
          value={timeValue}
          onChange={onTimeValueChange}
          label="Due time"
          required
          icon={<AiOutlineClockCircle />}
          withSeconds
          invalid={dateError}
          error={dateError && dateErrorMessage}
        />
        <TextInput
          placeholder="Countdown name"
          label="Optional name"
          onChange={(e) => setName(e.currentTarget.value)}
          invalid={nameError}
          error={nameError && nameErrorMessage}
        />
        <div className={classes.submitButtonContainer}>
          <Button
            className={classes.submitButton}
            variant="light"
            color="orange"
            disabled={!canSubmit}
            onClick={onSubmitCreation}
          >
            Create
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CountdownNew;
