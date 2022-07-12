import React, { useEffect, useState } from 'react';
import { useMedplum } from '@medplum/react';
import { Bundle, CarePlan } from '@medplum/fhirtypes';
import { Link } from 'react-router-dom';
import { CalendarIcon } from '@heroicons/react/solid';
import generateId from '../../helpers/generate-id';
import getLocaleDate from '../../helpers/get-locale-date';
import PageTitle from '../../components/PageTitle';

const actionItemsIdGenerator = generateId();

const profile = 'Patient/00a52397-8c6f-44ee-8e4d-e2ca7229feb4';

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

interface ActionItemsListProps {
  actionItems: CarePlan[];
  title: string;
}

function ActionItemsList({ actionItems, title }: ActionItemsListProps): JSX.Element {
  return (
    <div>
      <PageTitle title={title} />
      <div className="overflow-hidden border bg-white sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {actionItems &&
            actionItems.map((resource) => {
              if (resource) {
                return (
                  <React.Fragment key={resource.id}>
                    <li key={actionItemsIdGenerator.next().value}>
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
                  </React.Fragment>
                );
              }
            })}
        </ul>
      </div>
    </div>
  );
}

export default function ActionItems(): JSX.Element {
  const medplum = useMedplum();
  const [activeActionItems, setActiveActionItems] = useState<CarePlan[]>([]);
  const [actionItems, setActionItems] = useState<CarePlan[]>([]);

  const carePlanBundle: Bundle<CarePlan> = medplum.search('CarePlan', `_sort=-_lastUpdated&subject=${profile}`).read();

  useEffect(() => {
    if (carePlanBundle.entry) {
      const carePlanActiveItems: CarePlan[] = [];
      const carePlanItems: CarePlan[] = [];

      carePlanBundle.entry.forEach(({ resource }) => {
        if (resource?.period) {
          return resource.period.end ? carePlanItems.push(resource) : carePlanActiveItems.push(resource);
        }
      });
      setActiveActionItems(carePlanActiveItems);
      setActionItems(carePlanItems);
    }
  }, [carePlanBundle]);

  return (
    <div className="flex flex-col space-y-10">
      <ActionItemsList actionItems={activeActionItems} title="Action Items" />
      <ActionItemsList actionItems={actionItems} title="History" />
    </div>
  );
}
