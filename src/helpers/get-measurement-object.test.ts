import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import getMeasurementObject from './get-measurement-object';

describe('getMeasurementObject helper', () => {
  const mockDate = new Date(2000, 1, 1, 13);

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('should contain proper coding for valid Type', () => {
    const expectedCoding = {
      code: '85354-9',
    };
    const result = getMeasurementObject('Blood Pressure', 'testRef', 'testFirstVal', 'testSecondVal');

    expect(result.code?.coding).toBeDefined();
    expect(result.code?.coding?.[0]).toContain(expectedCoding);
  });

  test('should pass reference and value arguments to returned Observation object', () => {
    const testRef = 'testRef';
    const testFirstValue = '80';
    const testSecondValue = '140';
    const result = getMeasurementObject('Blood Pressure', testRef, testFirstValue, testSecondValue);

    expect(result.subject?.reference).toBe(testRef);

    expect(result.component).toBeDefined();
    expect(result.component).toHaveLength(2);
    expect(result.component?.[0].valueQuantity?.value).toBe(Number(testFirstValue));
    expect(result.component?.[1].valueQuantity?.value).toBe(Number(testSecondValue));
  });

  test('should contain current timestamp', () => {
    const result = getMeasurementObject('Body Temperature', 'testRef', 'testFirstVal', 'testSecondVal');

    const expectedDate: string = mockDate.toISOString();
    const isoTimestampRegexp = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;

    expect(result.effectiveDateTime).toMatch(isoTimestampRegexp);
    expect(result.effectiveDateTime).toEqual(expectedDate);
  });

  test('should return object only with resourceType field if not-valid type passed as argument', () => {
    const result = getMeasurementObject('NonValidType', '', '', '');
    const expectedProperty = 'resourceType';

    expect(result).toBeTypeOf('object');
    expect(result).toHaveProperty(expectedProperty);
    expect(Object.keys(result)).toHaveLength(1);
  });
});
