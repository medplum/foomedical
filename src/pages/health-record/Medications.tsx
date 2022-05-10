import { CalendarIcon, LocationMarkerIcon } from '@heroicons/react/solid';
import InfoSection from '../../components/InfoSection';
import NoData from '../../components/NoData';
import PageTitle from '../../components/PageTitle';

interface MedicationsItemType {
  id: number;
  title: string;
  type: string;
  location: string;
  department: string;
  closeDate: string;
  closeDateFull: string;
}

const title = 'Medications';
const medications = [] as MedicationsItemType[];

export default function Medications() {
  const hasData = medications.length > 0;
  return (
    <div>
      <PageTitle title={title} />
      {hasData ? (
        <InfoSection title={`Active ${title}`}>
          <ul role="list" className="divide-y divide-gray-200">
            {medications.map((medication) => (
              <li key={medication.id}>
                <a href="#" className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="truncate text-sm font-medium text-teal-600">{medication.title}</p>
                      <div className="ml-2 flex flex-shrink-0">
                        <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                          {medication.type}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <LocationMarkerIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          {medication.location}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        <p>
                          <time dateTime={medication.closeDate}>{medication.closeDateFull}</time>
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
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
