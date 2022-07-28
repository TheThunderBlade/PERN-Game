export const TimeFormat = (date) => {
  const time = new Date(date);
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timezone: 'UTC',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  return time.toLocaleString('en-US', options);
}