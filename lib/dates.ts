import dayjs from 'dayjs';

export const formatDate = (d: Date): string => {
  // TODO: Display TZ?
  return dayjs(d).format('YYYY-MM-DD HH:mm:ss');
};
