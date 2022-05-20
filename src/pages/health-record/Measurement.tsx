import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMedplum } from '@medplum/ui';
import { BundleEntry, Observation } from '@medplum/fhirtypes';
import { ChevronLeftIcon } from '@heroicons/react/solid';
import { InformationCircleIcon } from '@heroicons/react/outline';
import PageTitle from '../../components/PageTitle';
import Button from '../../components/Button';
import InfoSection from '../../components/InfoSection';
import LineChart from '../../components/LineChart';
import getLocaleDate from '../../helpers/get-locale-date';
import renderValue from '../../helpers/render-value';
import MeasurementCodes from '../../constants/measurementCodes';

interface measurementsMetaType {
  [key: string]: {
    id: string;
    code: string;
    title: string;
    description: string;
    chartDatasets: {
      label: string;
      backgroundColor: string;
      borderColor: string;
    }[];
  };
}

const backgroundColor = 'rgba(29, 112, 214, 0.7)';
const borderColor = 'rgba(29, 112, 214, 1)';
const secondBackgroundColor = 'rgba(255, 119, 0, 0.7)';
const secondBorderColor = 'rgba(255, 119, 0, 1)';

export const measurementsMeta: measurementsMetaType = {
  'blood-pressure': {
    id: 'blood-pressure',
    code: MeasurementCodes['85354-9'][0].code,
    title: 'Blood Pressure',
    description:
      'Your blood pressure is the pressure exerted on the walls of your blood vessels. When this pressure is high, it can damage your blood vessels and increase your risk for a heart attack or stroke. We measure your blood pressure periodically to make sure it is not staying high. Hypertention is a condition that refers to consistantly high blood pressure.',
    chartDatasets: [
      {
        label: 'Diastolic',
        backgroundColor: secondBackgroundColor,
        borderColor: secondBorderColor,
      },
      {
        label: 'Systolic',
        backgroundColor,
        borderColor,
      },
    ],
  },
  'body-temperature': {
    id: 'body-temperature',
    code: MeasurementCodes['8310-5'][0].code,
    title: 'Body Temperature',
    description: 'Your body temperature values',
    chartDatasets: [
      {
        label: 'Body Temperature',
        backgroundColor,
        borderColor,
      },
    ],
  },
  height: {
    id: 'height',
    code: MeasurementCodes['8302-2'][0].code,
    title: 'Height',
    description: 'Your height values',
    chartDatasets: [
      {
        label: 'Height',
        backgroundColor,
        borderColor,
      },
    ],
  },
  'respiratory-rate': {
    id: 'respiratory-rate',
    code: MeasurementCodes['9279-1'][0].code,
    title: 'Respiratory Rate',
    description: 'Your respiratory rate values',
    chartDatasets: [
      {
        label: 'Respiratory Rate',
        backgroundColor,
        borderColor,
      },
    ],
  },
  'heart-rate': {
    id: 'heart-rate',
    code: MeasurementCodes['8867-4'][0].code,
    title: 'Heart Rate',
    description: 'Your heart rate values',
    chartDatasets: [
      {
        label: 'Heart Rate',
        backgroundColor,
        borderColor,
      },
    ],
  },
  weight: {
    id: 'weight',
    code: MeasurementCodes['29463-7'][0].code,
    title: 'Weight',
    description: 'Your weight values',
    chartDatasets: [
      {
        label: 'Weight',
        backgroundColor,
        borderColor,
      },
    ],
  },
};

const Measurement = (): JSX.Element | null => {
  const { measurementId } = useParams();
  if (!measurementId) return null;
  const { code, title, description, chartDatasets } = measurementsMeta[measurementId];

  const medplum = useMedplum();
  const [measurements, setMeasurements] = useState<BundleEntry<Observation>[]>([]);

  useEffect(() => {
    medplum
      .search(`Observation?code=${code}&_sort=date&patient=Patient/3e27eaee-2c55-4400-926e-90982df528e9`)
      .then(({ entry }) => {
        if (entry) {
          setMeasurements(entry as BundleEntry<Observation>[]);
        }
      })
      .catch((error) => console.error(error));
  }, [measurementId]);

  const labels = measurements.map(({ resource }) => {
    if (resource?.effectiveDateTime) {
      return getLocaleDate(resource?.effectiveDateTime);
    }
  });

  const getDatasets = (index: number): (number | undefined)[] =>
    measurements.map(({ resource }) => {
      return resource?.component?.length
        ? resource?.component[index].valueQuantity?.value
        : resource?.valueQuantity?.value;
    });

  const chartData = {
    labels,
    datasets: chartDatasets.map((item, i) => ({
      ...item,
      data: getDatasets(i),
    })),
  };

  return (
    <div className="bg-white px-4 py-5 sm:rounded-lg sm:px-6">
      <Link to="/health-record/vitals" className="flex items-center text-sky-700">
        <ChevronLeftIcon className="mr-1 h-5 w-5 flex-shrink-0" />
        Vitals
      </Link>
      <div className="flex items-center justify-between">
        <PageTitle title={title} />
        <Button label="Add Measurement" action={() => console.log('some action')} />
      </div>
      <LineChart chartData={chartData} />
      {description && (
        <div className="mb-10 overflow-hidden border bg-white p-4 sm:rounded-md">
          <div className="mb-3 flex items-center text-gray-600">
            <InformationCircleIcon className="mr-2 h-6 w-6 flex-shrink-0" />
            <h3 className="text-lg font-bold">What is this measurement?</h3>
          </div>
          <p className="text-base text-gray-600">{description}</p>
        </div>
      )}
      <InfoSection
        title={
          <div className="flex justify-between">
            <p>Measurements</p>
            <p>Your Value</p>
          </div>
        }
      >
        <div className="px-4 pt-4 pb-2">
          {[...measurements].reverse().map(({ resource }) => {
            if (!resource) return null;

            const time = resource.effectiveDateTime ? getLocaleDate(resource.effectiveDateTime, true) : null;

            return (
              <div className="mb-2 flex justify-between" key={resource.id}>
                {time && <p>{time}</p>}
                {renderValue(resource)}
              </div>
            );
          })}
        </div>
      </InfoSection>
    </div>
  );
};

export default Measurement;
