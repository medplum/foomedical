import { describe, expect, test } from 'vitest';
import getPronoun from './get-pronoun';

describe('getPronoun test', () => {
  test('Should return He/Him if gender is male', () => {
    const gender = 'Male';
    const expectedResult = 'He/Him';

    const result = getPronoun(gender);

    expect(result).toBe(expectedResult);
  });

  test('Should return She/Her if gender is female', () => {
    const gender = 'Female';
    const expectedResult = 'She/Her';

    const result = getPronoun(gender);

    expect(result).toBe(expectedResult);
  });

  test('Should return Unknown if gender is not valid', () => {
    const gender = 'String with a not valid gender';
    const expectedResult = 'Unknown';

    const result = getPronoun(gender);

    expect(result).toBe(expectedResult);
  });
});
