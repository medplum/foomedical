import { TimingRepeat } from '@medplum/fhirtypes';

const getTimingRepeat = (repeat?: TimingRepeat): string => {
  if (!repeat) {
    return 'No instruction provided';
  }
  const { frequency, period, periodUnit } = repeat;
  const singularUnit = periodUnit === 'w' ? 'week' : 'day';
  const pluralUnits = periodUnit === 'w' ? 'weeks' : 'days';

  return `${frequency} ${frequency === 1 ? 'application' : 'applications'} per 
    ${period} ${period === 1 ? singularUnit : pluralUnits}`;
};

export default getTimingRepeat;
