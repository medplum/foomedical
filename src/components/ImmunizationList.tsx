// This example requires Tailwind CSS v2.0+
// https://tailwindui.com/components/application-ui/lists/stacked-lists
import { CalendarIcon, LocationMarkerIcon, UsersIcon } from '@heroicons/react/solid';

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

export default function ImmunizationList() {
  return (
    <div className="bg-white px-4 py-5 sm:rounded-lg sm:px-6">
      <h2 className="text-lg font-medium text-gray-900 mb-3">Immunizations</h2>
      <div className="bg-white border overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {positions.map((position) => (
            <li key={position.id}>
              <a href="#" className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-teal-600 truncate">{position.title}</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {position.type}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        {position.location}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
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
      </div>
    </div>
  );
}
