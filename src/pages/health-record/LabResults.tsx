// This example requires Tailwind CSS v2.0+
// https://tailwindui.com/components/application-ui/headings/card-headings
// https://tailwindui.com/components/application-ui/lists/stacked-lists
import { ChevronRightIcon } from '@heroicons/react/solid';
import InfoSection from '../../components/InfoSection';
import NoData from '../../components/NoData';
import { useMedplum } from '@medplum/ui';
import PageTitle from '../../components/PageTitle';
import { useEffect, useState } from 'react';
import getLocaleDate from '../../helpers/get-locale-date';
import { Bundle, DiagnosticReport } from '@medplum/fhirtypes';
import { Link } from 'react-router-dom';

export default function LabResults(): JSX.Element {
  const medplum = useMedplum();
  const [bundle, setBundle] = useState<Bundle<DiagnosticReport>>();
  const data = bundle?.entry;
  const hasData = data && data?.length > 0;

  useEffect(() => {
    medplum
      .search('DiagnosticReport?_sort=-_lastUpdated&subject=Patient/0beab6fe-fc9c-4276-af71-4df508097eb2')
      .then((value) => setBundle(value as Bundle<DiagnosticReport>))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-white px-4 py-5 sm:rounded-lg sm:px-6">
      <PageTitle title="Lab Results" />
      {hasData ? (
        <InfoSection title="Past Results">
          <ul role="list" className="divide-y divide-gray-200">
            {data.map(({ resource }) => (
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
    </div>
  );
}
