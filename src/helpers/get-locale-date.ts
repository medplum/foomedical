const getLocaleDate = (stringDate: string): string => {
  const date = new Date(stringDate);

  return date.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export default getLocaleDate;
