import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { getReferenceString } from '@medplum/core';
import { BundleEntry, Immunization, Patient } from '@medplum/fhirtypes';
import { useMedplum } from '@medplum/react';
import { useEffect, useState } from 'react';
import InfoSection from '../../components/InfoSection';
import NoData from '../../components/NoData';
import PageTitle from '../../components/PageTitle';
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
                <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
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
  const patient = medplum.getProfile() as Patient;
  const [pastVaccines, setPastVaccines] = useState<BundleEntry<Immunization>[]>([]);
  const [upcomingVaccines, setUpcomingVaccines] = useState<BundleEntry<Immunization>[]>([]);
  const bundle = medplum.search('Immunization', 'patient=' + getReferenceString(patient)).read();

  useEffect(() => {
    if (bundle.entry) {
      const vaccines = bundle.entry as BundleEntry<Immunization>[];

      let index = 0;
      vaccines.find(({ resource }: BundleEntry<Immunization>, i) => {
        if (resource?.occurrenceDateTime) {
          const date = new Date(resource.occurrenceDateTime);
          const today = new Date();

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
  }, [bundle]);

  return (
    <>
      <PageTitle title="Vaccines" />
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
    </>
  );
}
