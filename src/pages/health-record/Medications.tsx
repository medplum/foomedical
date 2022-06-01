import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useMedplum } from '@medplum/react';
import { profileContext } from '../../profileContext';
import { ChevronRightIcon } from '@heroicons/react/solid';
import InfoSection from '../../components/InfoSection';
import NoData from '../../components/NoData';
import PageTitle from '../../components/PageTitle';
import { Bundle, MedicationRequest } from '@medplum/fhirtypes';

const title = 'Medications';

export default function Medications() {
  const medplum = useMedplum();
  const profile = useContext(profileContext);
  const [bundle, setBundle] = useState<Bundle<MedicationRequest>>();
  const data = bundle?.entry;
  const hasData = data && data.length > 0;

  useEffect(() => {
    medplum
      .search(`MedicationRequest?_sort=-_lastUpdated&patient=Patient/0beab6fe-fc9c-4276-af71-4df508097eb2`)
      .then((value) => {
        setBundle(value as Bundle<MedicationRequest>);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <PageTitle title={title} />
      {hasData ? (
        <InfoSection title={`Active ${title}`}>
          <ul role="list" className="divide-y divide-gray-200">
            {data.map(({ resource }) => (
              <li key={resource?.id}>
                {resource?.id && (
                  <Link to={resource?.id} className="block hover:bg-gray-50">
                    <div className="flex items-center justify-between px-4 py-4 sm:px-6">
                      <div>
                        <p className="truncate text-sm font-medium text-teal-600">
                          {resource?.medicationCodeableConcept?.text}
                        </p>
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
        <NoData title={title} />
      )}
    </div>
  );
}
