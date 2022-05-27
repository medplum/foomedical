// This example requires Tailwind CSS v2.0+
// https://tailwindui.com/components/application-ui/lists/stacked-lists
import { CalendarIcon, LocationMarkerIcon } from '@heroicons/react/solid';

const positions = [
  {
    id: 1,
    title: 'Schedule a flue shot',
    type: 'Complete',
    location: 'San Francisco General Hospital',
    department: 'Engineering',
    closeDate: '2020-01-07',
    closeDateFull: 'January 7, 2020',
  },
  {
    id: 2,
    title: 'Schedule your annual physical',
    type: 'Complete',
    location: 'Walgreens, Fillmore Street',
    department: 'Engineering',
    closeDate: '2020-01-07',
    closeDateFull: 'January 7, 2020',
  },
  {
    id: 3,
    title: 'Walk in for lab work',
    type: 'Complete',
    location: 'UCSF Mt Zion',
    department: 'Design',
    closeDate: '2020-01-14',
    closeDateFull: 'January 14, 2020',
  },
  {
    id: 4,
    title: 'Book a physical exam',
    type: 'Complete',
    location: 'UCSF Mt Zion',
    department: 'Design',
    closeDate: '2020-01-14',
    closeDateFull: 'January 14, 2020',
  },
];

export default function ActionItems(): JSX.Element {
  return (
    <div className="bg-white px-4 py-5 sm:rounded-lg sm:px-6">
      <h2 className="mb-3 text-lg font-medium text-gray-900">Action Items</h2>
      <div className="overflow-hidden border bg-white sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {positions.map((position) => (
            <li key={position.id}>
              <a href="src/pages/care-plan/ActionItemsList#" className="block hover:bg-gray-50">
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
      </div>
    </div>
  );
}
