// This example requires Tailwind CSS v2.0+
// https://tailwindui.com/components/application-ui/lists/stacked-lists
import { useState, useEffect } from 'react';
import { CalendarIcon, LocationMarkerIcon } from '@heroicons/react/solid';
import { formatSearchQuery, Operator, SearchRequest } from '@medplum/core';
import { useMedplum } from '@medplum/ui';
import { BundleEntry, Immunization } from '@medplum/fhirtypes';
import PageTitle from '../../components/PageTitle';
import InfoSection from '../../components/InfoSection';
import Button from '../../components/Button';
import NoData from '../../components/NoData';
import getLocaleDate from '../../helpers/get-locale-date';

interface VaccineProps {
  resource: Immunization;
}

const Vaccine = ({ resource }: VaccineProps): JSX.Element => {
  const date = resource?.occurrenceDateTime ? getLocaleDate(resource?.occurrenceDateTime) : null;

  return (
    <li key={resource?.id}>
      <a href="#" className="block hover:bg-gray-50">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <p className="truncate text-sm font-medium text-teal-600">{resource?.vaccineCode?.text}</p>
            <div className="ml-2 flex flex-shrink-0">
              <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                {resource?.status}
              </p>
            </div>
          </div>
          <div className="mt-2 sm:flex sm:justify-between">
            <div className="sm:flex">
              <p className="flex items-center text-sm text-gray-500">
                <LocationMarkerIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                {resource?.location?.display}
              </p>
            </div>
            {date && (
              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                <p>
                  <time dateTime={resource.occurrenceDateTime}>{date}</time>
                </p>
              </div>
            )}
          </div>
        </div>
      </a>
    </li>
  );
};

export default function ImmunizationList(): JSX.Element {
  const medplum = useMedplum();
  const [pastVaccines, setPastVaccines] = useState<BundleEntry<Immunization>[]>([]);
  const [upcomingVaccines, setUpcomingVaccines] = useState<BundleEntry<Immunization>[]>([]);

  const today = new Date();

  const searchRequest: SearchRequest = {
    resourceType: 'Immunization',
    filters: [
      {
        code: 'patient',
        operator: Operator.EQUALS,
        value: 'Patient/3e27eaee-2c55-4400-926e-90982df528e9',
      },
    ],
    sortRules: [
      {
        code: 'date',
        descending: true,
      },
    ],
  };

  useEffect(() => {
    medplum.search(searchRequest).then(({ entry }) => {
      if (entry) {
        const vaccines = entry as BundleEntry<Immunization>[];

        let index = 0;
        vaccines.find(({ resource }: BundleEntry<Immunization>, i) => {
          if (resource?.occurrenceDateTime) {
            const date = new Date(resource.occurrenceDateTime);

            if (date < today) {
              index = i;
              return resource;
            }
          }
        });

        const pastVaccinesArray = vaccines.slice(index);
        const upcomingVaccinesArray = vaccines.slice(0, index);

        setPastVaccines(pastVaccinesArray);
        setUpcomingVaccines(upcomingVaccinesArray);
      }
    });
  }, []);

  return (
    <div className="bg-white px-4 py-5 sm:rounded-lg sm:px-6">
      <PageTitle title="Vaccines" />
      <div className="mb-5 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <p className="mt-2 text-sm text-gray-700">Need to download or share a copy of your vaccine records?</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Button
            label="Download"
            action={() => {
              const url = medplum.fhirUrl(searchRequest.resourceType) + '/$csv' + formatSearchQuery(searchRequest);
              medplum.download(url).then((blob) => {
                window.open(window.URL.createObjectURL(blob), '_blank');
              });
            }}
          />
        </div>
      </div>
      {!upcomingVaccines.length ? (
        <NoData title="upcoming vaccines" />
      ) : (
        <InfoSection title="Upcoming">
          <ul role="list" className="divide-y divide-gray-200">
            {upcomingVaccines.map(({ resource }) => {
              return resource ? <Vaccine resource={resource} key={resource?.id} /> : null;
            })}
          </ul>
        </InfoSection>
      )}
      {!pastVaccines.length ? (
        <NoData title="past vaccines" />
      ) : (
        <InfoSection title="Past vaccines">
          <ul role="list" className="divide-y divide-gray-200">
            {pastVaccines.map(({ resource }) => {
              return resource ? <Vaccine resource={resource} key={resource?.id} /> : null;
            })}
          </ul>
        </InfoSection>
      )}
    </div>
  );
}
