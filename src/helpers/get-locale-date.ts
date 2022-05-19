const getLocaleDate = (stringDate: string, isHoursDisplayed = false): string => {
  const date = new Date(stringDate);

  return date.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: isHoursDisplayed ? '2-digit' : undefined,
  });
};

export default getLocaleDate;
