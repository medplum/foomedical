import { ChevronRightIcon } from '@heroicons/react/solid';
import { getReferenceString } from '@medplum/core';
import { Patient } from '@medplum/fhirtypes';
import { useMedplum } from '@medplum/react';
import { Link } from 'react-router-dom';
import InfoSection from '../../components/InfoSection';
import NoData from '../../components/NoData';
import PageTitle from '../../components/PageTitle';
import getLocaleDate from '../../helpers/get-locale-date';

export default function LabResults(): JSX.Element {
  const medplum = useMedplum();
  const patient = medplum.getProfile() as Patient;
  const bundle = medplum.search('DiagnosticReport', 'subject=' + getReferenceString(patient)).read();

  return (
    <>
      <PageTitle title="Lab Results" />
      {bundle.entry ? (
        <InfoSection title="Past Results">
          <ul role="list" className="divide-y divide-gray-200">
            {bundle.entry.map(({ resource }) => (
              <li key={resource?.id}>
                {resource?.meta?.lastUpdated && resource?.id && (
                  <Link to={resource?.id} className="block hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="w-full px-4 py-4 sm:px-6">
                        <div>
                          <div className="text-black-500 mb-2 flex items-center text-lg last:mb-0">
                            <p>
                              <time>
                                {resource?.meta?.lastUpdated ? getLocaleDate(resource?.meta?.lastUpdated) : null}
                              </time>
                            </p>
                          </div>
                          {resource.code?.text && (
                            <p className="text-sm font-medium text-gray-400">{resource.code.text}</p>
                          )}
                        </div>
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
        <NoData title="results" />
      )}
    </>
  );
}
