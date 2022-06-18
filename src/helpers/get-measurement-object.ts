import { Observation } from '@medplum/fhirtypes';

const getMeasurementObject = (
  type: string,
  reference: string,
  firstValue: string,
  secondValue?: string
): Observation => {
  const date = new Date().toISOString();

  switch (type) {
    case 'Blood Pressure':
      return {
        resourceType: 'Observation',
        subject: {
          reference: reference,
        },
        code: {
          coding: [
            {
              code: '85354-9',
              display: 'Blood Pressure',
              system: 'http://loinc.org',
            },
          ],
          text: 'Blood Pressure',
        },
        component: [
          {
            code: {
              coding: [
                {
                  code: '8462-4',
                  display: 'Diastolic Blood Pressure',
                  system: 'http://loinc.org',
                },
              ],
              text: 'Diastolic Blood Pressure',
            },
            valueQuantity: {
              code: 'mm[Hg]',
              system: 'http://unitsofmeasure.org',
              unit: 'mm[Hg]',
              value: Number(firstValue),
            },
          },
          {
            code: {
              coding: [
                {
                  code: '8480-6',
                  display: 'Systolic Blood Pressure',
                  system: 'http://loinc.org',
                },
              ],
              text: 'Systolic Blood Pressure',
            },
            valueQuantity: {
              code: 'mm[Hg]',
              system: 'http://unitsofmeasure.org',
              unit: 'mm[Hg]',
              value: Number(secondValue),
            },
          },
        ],
        effectiveDateTime: date,
        status: 'final',
      };
    case 'Body Temperature':
      return {
        resourceType: 'Observation',
        subject: {
          reference: reference,
        },
        code: {
          coding: [
            {
              code: '8310-5',
              display: 'Body temperature',
              system: 'http://loinc.org',
            },
            {
              code: '8331-1',
              display: 'Oral temperature',
              system: 'http://loinc.org',
            },
          ],
          text: 'Body temperature',
        },
        valueQuantity: {
          code: 'Cel',
          system: 'http://unitsofmeasure.org',
          unit: 'Cel',
          value: Number(firstValue),
        },
        effectiveDateTime: date,
        status: 'final',
      };
    case 'Height':
      return {
        resourceType: 'Observation',
        subject: {
          reference: reference,
        },
        code: {
          coding: [
            {
              code: '8302-2',
              display: 'Body Height',
              system: 'http://loinc.org',
            },
          ],
          text: 'Body Height',
        },
        valueQuantity: {
          code: 'cm',
          system: 'http://unitsofmeasure.org',
          unit: 'cm',
          value: Number(firstValue),
        },
        effectiveDateTime: date,
        status: 'final',
      };
    case 'Respiratory Rate':
      return {
        resourceType: 'Observation',
        subject: {
          reference: reference,
        },
        code: {
          coding: [
            {
              code: '9279-1',
              display: 'Respiratory rate',
              system: 'http://loinc.org',
            },
          ],
          text: 'Respiratory rate',
        },
        valueQuantity: {
          code: '/min',
          system: 'http://unitsofmeasure.org',
          unit: '/min',
          value: Number(firstValue),
        },
        effectiveDateTime: date,
        status: 'final',
      };
    case 'Heart Rate':
      return {
        resourceType: 'Observation',
        subject: {
          reference: reference,
        },
        code: {
          coding: [
            {
              code: '8867-4',
              display: 'Heart rate',
              system: 'http://loinc.org',
            },
          ],
          text: 'Heart rate',
        },
        valueQuantity: {
          code: '/min',
          system: 'http://unitsofmeasure.org',
          unit: '/min',
          value: Number(firstValue),
        },
        effectiveDateTime: date,
        status: 'final',
      };
    case 'Weight':
      return {
        resourceType: 'Observation',
        subject: {
          reference: reference,
        },
        code: {
          coding: [
            {
              code: '29463-7',
              display: 'Body Weight',
              system: 'http://loinc.org',
            },
          ],
          text: 'Body Weight',
        },
        valueQuantity: {
          code: 'kg',
          system: 'http://unitsofmeasure.org',
          unit: 'kg',
          value: Number(firstValue),
        },
        effectiveDateTime: date,
        status: 'final',
      };
    default:
      return { resourceType: 'Observation' };
  }
};

export default getMeasurementObject;
