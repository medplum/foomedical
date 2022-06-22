import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMedplum } from '@medplum/react';
import { MedicationRequest } from '@medplum/fhirtypes';
import getTimingRepeat from '../../helpers/get-timing-repeat';
import getLocaleDate from '../../helpers/get-locale-date';
import LinkToPreviousPage from '../../components/LinkToPreviousPage';
import PageTitle from '../../components/PageTitle';
import InfoSection from '../../components/InfoSection';
import TwoColumnsList, { TwoColumnsListItemProps } from '../../components/TwoColumnsList';
import NoData from '../../components/NoData';

export default function Medication(): JSX.Element {
  const medplum = useMedplum();
  const { medicationId = '' } = useParams();
  const [medicationValues, setMedicationValues] = useState<TwoColumnsListItemProps[]>([]);

  const resource: MedicationRequest = medplum.readResource('MedicationRequest', medicationId).read();

  useEffect(() => {
    const medication = [];

    if (resource.dosageInstruction) {
      medication.push({
        label: 'Instruction',
        body: (
          <div className="flex flex-col">
            <p className="text-lg text-gray-600">{getTimingRepeat(resource.dosageInstruction[0].timing?.repeat)}</p>
            {resource.dosageInstruction[0].text && (
              <p className="text-lg text-gray-600">{resource.dosageInstruction[0].text}</p>
            )}
          </div>
        ),
      });
    }
    if (resource.authoredOn) {
      medication.push({
        label: 'Last prescribed',
        body: (
          <p className="text-lg text-gray-600">
            {getLocaleDate(resource.authoredOn)} by {resource.requester?.display}
          </p>
        ),
      });
    }
    if (resource.status) {
      medication.push({
        label: 'Status',
        body: <p className="text-lg capitalize text-gray-600">{resource.status}</p>,
      });
    }

    setMedicationValues(medication);
  }, [resource]);

  return (
    <>
      {resource ? (
        <>
          <LinkToPreviousPage url="/health-record/medications" label="All Medications" />
          {resource.medicationCodeableConcept?.text && <PageTitle title={resource.medicationCodeableConcept?.text} />}
          <p className="mb-6 text-lg text-gray-600">To refill this medication, please contact your pharmacy.</p>
          <p className="mb-6 text-lg text-gray-600">
            No more refills available at your pharmacy?{' '}
            <Link to={`/health-record/medications/${medicationId}/prescription-renewal`} className="text-sky-700">
              Renew your prescription
            </Link>
          </p>
          <InfoSection title="Details">
            <TwoColumnsList items={medicationValues} />
          </InfoSection>
        </>
      ) : (
        <NoData title="results" />
      )}
    </>
  );
}
