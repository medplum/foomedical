import { CalendarIcon } from '@heroicons/react/solid';
import { getReferenceString } from '@medplum/core';
import { Bundle, CarePlan, Patient } from '@medplum/fhirtypes';
import { useMedplum } from '@medplum/react';
import { Link } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import getLocaleDate from '../../helpers/get-locale-date';
import NoData from '../../components/NoData';

const getStatusStyles = (status: string): string => {
  switch (status) {
    case 'active':
      return 'bg-sky-100 text-sky-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'entered-in-error':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function ActionItems(): JSX.Element {
  const medplum = useMedplum();
  const patient = medplum.getProfile() as Patient;

  const carePlanBundle: Bundle<CarePlan> = medplum.search('CarePlan', 'subject=' + getReferenceString(patient)).read();

  return (
    <>
      {carePlanBundle.entry && carePlanBundle.entry?.length > 0 ? (
        <>
          <PageTitle title="Action Items" />
          <div className="overflow-hidden border bg-white sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
              {carePlanBundle.entry.map(({ resource }) => {
                if (resource) {
                  return (
                    <li key={resource.id}>
                      <Link to={resource.id || ''} className="block hover:bg-gray-50">
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            {resource.title && (
                              <p className="truncate text-sm font-medium text-teal-600">{resource.title}</p>
                            )}
                            <div className="ml-2 flex flex-shrink-0">
                              {resource.status && (
                                <p
                                  className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusStyles(
                                    resource.status
                                  )}`}
                                >
                                  {resource.status}
                                </p>
                              )}
                            </div>
                          </div>
                          {resource.period && (
                            <div className="mt-2 sm:flex sm:justify-between">
                              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                <CalendarIcon
                                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                  aria-hidden="true"
                                />
                                <p>
                                  <time>{getLocaleDate(resource.period.start)} </time>
                                </p>
                                {resource.period.end && (
                                  <p>
                                    <time>&nbsp;-&nbsp;{getLocaleDate(resource.period.end)}</time>
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </>
      ) : (
        <NoData title="action items" />
      )}
    </>
  );
}
