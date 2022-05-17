const getGender = (genderString: string): string => {
  const gender = genderString.toLowerCase();

  if (gender === 'male') return 'He/Him';
  if (gender === 'female') return 'She/Her';
  return 'Unknown';
};

export default getGender;
