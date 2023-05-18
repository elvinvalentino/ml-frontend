export const getDayOfWeekName = (dayOfWeek: number) => {
  const dayOfWeeks = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  return dayOfWeeks[dayOfWeek];
};
