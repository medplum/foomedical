import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { getReferenceString } from '@medplum/core';
import { Patient } from '@medplum/fhirtypes';
import { useMedplum } from '@medplum/react';
import { Link } from 'react-router-dom';
import InfoSection from '../../components/InfoSection';
import NoData from '../../components/NoData';
import PageTitle from '../../components/PageTitle';

const title = 'Medications';

export default function Medications(): JSX.Element {
  const medplum = useMedplum();
  const patient = medplum.getProfile() as Patient;
  const bundle = medplum.search('MedicationRequest', 'patient=' + getReferenceString(patient)).read();

  return (
    <>
      <PageTitle title="Medications" />
      {bundle.entry?.length ? (
        <InfoSection title="Medications">
          <ul role="list" className="divide-y divide-gray-200">
            {bundle.entry.map(({ resource }) => (
              <li key={resource?.id}>
                {resource?.id && (
                  <Link to={resource?.id} className="block hover:bg-gray-50">
                    <div className="flex items-center justify-between px-4 py-4 sm:px-6">
                      <div>
                        <p className="text-sm font-medium text-teal-600">{resource?.medicationCodeableConcept?.text}</p>
                        <p className="mt-1 text-sm text-gray-500">{resource?.requester?.display}</p>
                      </div>
                      <ChevronRightIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
                    </div>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </InfoSection>
      ) : (
        <NoData title="medications" />
      )}
    </>
  );
}
