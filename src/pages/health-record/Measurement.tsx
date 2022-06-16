import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMedplum } from '@medplum/react';
import { BundleEntry, Observation } from '@medplum/fhirtypes';
import { InformationCircleIcon } from '@heroicons/react/outline';
import Button from '../../components/Button';
import InfoSection from '../../components/InfoSection';
import LineChart from '../../components/LineChart';
import LinkToPreviousPage from '../../components/LinkToPreviousPage';
import getLocaleDate from '../../helpers/get-locale-date';
import renderValue from '../../helpers/get-render-value';
import MeasurementCodes from '../../constants/measurementCodes';
import MeasurementModal from '../../components/MeasurementModal';

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

interface chartDataType {
  labels: (string | null | undefined)[];
  datasets: {
    label: string;
    data: (number | undefined)[];
    backgroundColor: string;
    borderColor?: string;
  }[];
}

export const backgroundColor = 'rgba(29, 112, 214, 0.7)';
export const borderColor = 'rgba(29, 112, 214, 1)';
export const secondBackgroundColor = 'rgba(255, 119, 0, 0.7)';
export const secondBorderColor = 'rgba(255, 119, 0, 1)';

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [chartData, setChartData] = useState<chartDataType>();

  const profile = 'Patient/0beab6fe-fc9c-4276-af71-4df508097eb2';

  let measurements = medplum.search('Observation', `code=${code}&_sort=date&patient=${profile}`).read();

  useEffect(() => {
    measurements = medplum.search('Observation', `code=${code}&_sort=date&patient=${profile}`).read();
  }, [measurementId]);

  useEffect(() => {
    if (measurements.entry) {
      const labels = measurements.entry.map(({ resource }) => {
        if (resource?.effectiveDateTime) {
          return getLocaleDate(resource?.effectiveDateTime);
        }
      });

      setChartData({
        labels,
        datasets: chartDatasets.map((item, i) => ({
          ...item,
          data: getDatasets(i, measurements.entry),
        })),
      });
    }
  }, [measurements]);

  const getDatasets = (index: number, measurements?: BundleEntry<Observation>[]): (number | undefined)[] => {
    if (measurements) {
      return measurements.map(({ resource }) =>
        resource?.component?.length ? resource?.component[index].valueQuantity?.value : resource?.valueQuantity?.value
      );
    }
    return [];
  };

  const handleAddMeasurement = (): void => {
    setIsModalOpen(true);
  };

  return (
    <>
      <LinkToPreviousPage url="/health-record/vitals" label="Vitals" />
      <div className="mt-5 flex flex-col items-start space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <h1 className="text-3xl font-extrabold">{title}</h1>
        <Button marginsUtils="ml-0" label="Add Measurement" action={handleAddMeasurement} />
      </div>
      {chartData && <LineChart chartData={chartData} />}
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
          {measurements.entry &&
            [...measurements.entry].reverse().map(({ resource }) => {
              if (!resource) return null;

              const time = getLocaleDate(resource.effectiveDateTime, true);

              return (
                <div className="mb-2 flex justify-between" key={resource.id}>
                  {time && <p>{time}</p>}
                  {renderValue(resource)}
                </div>
              );
            })}
        </div>
      </InfoSection>
      <MeasurementModal
        type={title}
        profile={profile}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
      />
    </>
  );
};

export default Measurement;
