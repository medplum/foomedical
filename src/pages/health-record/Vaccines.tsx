// This example requires Tailwind CSS v2.0+
// https://tailwindui.com/components/application-ui/headings/card-headings
// https://tailwindui.com/components/application-ui/lists/stacked-lists
import { CalendarIcon, LocationMarkerIcon, ChevronRightIcon } from '@heroicons/react/solid';
import PageTitle from '../../components/PageTitle';
import InfoSection from '../../components/InfoSection';
import Button from '../../components/Button';

const positions = [
  {
    id: 1,
    title: 'COVID-19 (Pfizer)',
    type: 'Complete',
    location: 'San Francisco General Hospital',
    department: 'Engineering',
    closeDate: '2020-01-07',
    closeDateFull: 'January 7, 2020',
  },
  {
    id: 2,
    title: 'COVID-19 (J&J)',
    type: 'Complete',
    location: 'Walgreens, Fillmore Street',
    department: 'Engineering',
    closeDate: '2020-01-07',
    closeDateFull: 'January 7, 2020',
  },
  {
    id: 3,
    title: 'MMR',
    type: 'Complete',
    location: 'UCSF Mt Zion',
    department: 'Design',
    closeDate: '2020-01-14',
    closeDateFull: 'January 14, 2020',
  },
];

export default function ImmunizationList(): JSX.Element {
  return (
    <div className="bg-white px-4 py-5 sm:rounded-lg sm:px-6">
      <PageTitle title="Vaccines" />
      <div className="mb-5 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <p className="mt-2 text-sm text-gray-700">Need to download or share a copy of your vaccine records?</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Button label="Download" action={() => console.log('download action')} />
        </div>
      </div>
      <InfoSection title="Upcoming">
        <ul role="list" className="divide-y divide-gray-200">
          <li>
            <a href="#" className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-medium text-teal-600">Schedule a flu shot today</p>
                  <ChevronRightIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
                </div>
              </div>
            </a>
          </li>
        </ul>
      </InfoSection>
      <InfoSection title="Past vaccines">
        <ul role="list" className="divide-y divide-gray-200">
          {!positions.length && <p className="px-4 text-sm font-medium text-gray-500">No vaccines available</p>}
          {positions?.map((position) => (
            <li key={position.id}>
              <a href="#" className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-medium text-teal-600">{position.title}</p>
                    <div className="ml-2 flex flex-shrink-0">
                      <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                        {position.type}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <LocationMarkerIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        {position.location}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                      <p>
                        <time dateTime={position.closeDate}>{position.closeDateFull}</time>
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </InfoSection>
    </div>
  );
}
