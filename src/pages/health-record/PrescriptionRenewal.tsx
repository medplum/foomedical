import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMedplum } from '@medplum/react';
import { formatHumanName } from '@medplum/core';
import { MedicationRequest, Patient } from '@medplum/fhirtypes';
import { BeakerIcon } from '@heroicons/react/24/outline';
import PageTitle from '../../components/PageTitle';
import InfoSection from '../../components/InfoSection';
import LinkToPreviousPage from '../../components/LinkToPreviousPage';
import TwoColumnsList, { TwoColumnsListItemProps } from '../../components/TwoColumnsList';
import RenewalNotification, { NotificationValues } from '../../components/RenewalNotification';
import getTimingRepeat from '../../helpers/get-timing-repeat';
import getLocaleDate from '../../helpers/get-locale-date';

export default function PrescriptionRenewal(): JSX.Element {
  const medplum = useMedplum();
  const navigate = useNavigate();
  const { medicationId = '' } = useParams();
  const date = new Date().toISOString();

  const [prescription, setPrescription] = useState<TwoColumnsListItemProps[]>([]);
  const [isPrescriptionChecked, setIsPrescriptionChecked] = useState(false);
  const [notificationValues, setNotificationValues] = useState<NotificationValues>({
    show: false,
    url: '',
  });

  const resource: MedicationRequest = medplum.readResource('MedicationRequest', medicationId).read();
  const patientId = resource.subject?.reference ? resource.subject?.reference.split('/') : '';
  const patient: Patient = medplum.readResource('Patient', patientId[1]).read();

  const handlePrescriptionChange = (): void => {
    setIsPrescriptionChecked(!isPrescriptionChecked);
  };

  const handlePrescriptionRenewal = (): void => {
    medplum
      .createResource({
        ...resource,
        status: 'draft',
        note: [
          {
            time: date,
            text: 'Patient Requested Refill',
          },
        ],
      })
      .then((value) => {
        setIsPrescriptionChecked(false);
        setNotificationValues({ show: true, url: `/health-record/medications/${value.id || ''}` });
      })
      .catch((err) => console.error(err));
  };

  const getRenewalStatus = (status: string): string | JSX.Element => {
    if (status === 'active') {
      return <span className="text-emerald-700">{status}</span>;
    } else if (status === 'stopped') {
      return <span className="text-red-700">{status}</span>;
    } else {
      return status;
    }
  };

  useEffect(() => {
    const prescriptionData = [];

    if (patient.name) {
      prescriptionData.push({
        label: 'Patient',
        body: <p className="text-lg text-gray-600">{formatHumanName(patient.name[0])}</p>,
      });
    }
    if (resource.authoredOn) {
      prescriptionData.push({
        label: 'Last prescribed',
        body: <p className="text-lg text-gray-600">{getLocaleDate(resource.authoredOn)}</p>,
      });
    }
    if (resource.status) {
      prescriptionData.push({
        label: 'Status',
        body: <p className="text-lg text-gray-600">{getRenewalStatus(resource.status)}</p>,
      });
    }

    setPrescription(prescriptionData);
  }, [resource, patient]);

  return (
    <div className="bg-white px-4 py-5 sm:rounded-lg sm:px-6">
      <h1 className="py-5 text-4xl font-extrabold">Prescription Renewal</h1>
      <p className="mb-5 text-lg text-gray-600">
        To refill any of your current medications, please contact your pharmacy.
      </p>
      <p className="text-lg text-gray-600">
        No more refills available at your pharmacy? Select your pharmacy and prescriptions for renewal below.
      </p>
      <div className="mt-5">
        <PageTitle title="Request a Renewal" />
        <InfoSection title="Prescription information">
          <TwoColumnsList items={prescription} />
        </InfoSection>
        <InfoSection title="Select prescriptions for renewal">
          <div className="flex flex-col items-start justify-between space-y-5 p-3 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-10 lg:p-5">
            <div className="flex sm:space-x-5">
              <BeakerIcon className="hidden h-10 w-10 self-center text-gray-400 hover:text-teal-600 sm:flex" />
              <div className="flex flex-col justify-center">
                <p className="mb-1 text-lg font-bold last:mb-0">{resource.medicationCodeableConcept?.text}</p>
                {resource.dosageInstruction && (
                  <p className="text-lg text-gray-600">
                    {getTimingRepeat(resource.dosageInstruction[0].timing?.repeat)}
                  </p>
                )}
              </div>
            </div>
            {resource.status === 'stopped' && (
              <input
                id="prescription"
                name="prescription"
                type="checkbox"
                className="h-6 w-6 cursor-pointer rounded border-gray-600 text-teal-600 focus:ring-teal-500"
                checked={isPrescriptionChecked}
                onChange={handlePrescriptionChange}
              />
            )}
          </div>
        </InfoSection>
        <div className="flex flex-col items-start space-y-4 sm:flex-row sm:items-center sm:justify-end sm:space-y-0 sm:space-x-4">
          <LinkToPreviousPage onClick={() => navigate(-1)} label="Cancel" isIconProvided={false} />
          <button
            type="button"
            disabled={!isPrescriptionChecked}
            onClick={handlePrescriptionRenewal}
            className="inline-flex items-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-75"
          >
            Renew Prescription
          </button>
        </div>
      </div>
      <RenewalNotification
        notificationValues={notificationValues}
        onClose={() => setNotificationValues({ show: false, url: '' })}
      />
    </div>
  );
}
