import { useEffect, useState } from 'react';
import { useMedplum } from '@medplum/ui';
import { Patient } from '@medplum/fhirtypes';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import InfoSection from '../../components/InfoSection';
import GeneralInfo from '../../components/GeneralInfo';
import TwoColumnsList from '../../components/TwoColumnsList';
import NoData from '../../components/NoData';
import getLocaleDate from '../../helpers/get-locale-date';
import generateId from '../../helpers/generate-id';

const profileIdGenerator = generateId();

interface getNameProps {
  hasPrefix?: boolean;
  firstName?: boolean;
  lastName?: boolean;
}

export default function Profile() {
  const medplum = useMedplum();
  const [patient, setPatient] = useState<Patient>();

  const getName = ({ hasPrefix, firstName, lastName }: getNameProps) => {
    const { prefix = 'Mr', given = 'John', family = 'Doe' } = patient?.name ? patient?.name[0] : {};

    return `${hasPrefix ? `${prefix + ' '}` : ''}${firstName ? `${given + ' '}` : ''}${lastName ? family : ''}`;
  };

  const personalItems = [
    {
      label: (
        <>
          <p>Legal name</p>
          <ExclamationCircleIcon className="ml-2 h-6 w-6 text-emerald-700" aria-hidden="true" />
        </>
      ),
      body: (
        <>
          <p className="mt-1 text-base text-gray-600">{getName({ firstName: true, lastName: true })}</p>
        </>
      ),
    },
    {
      label: 'Preferred name',
      body: (
        <>
          <p className="mt-1 text-base text-gray-600">{getName({ firstName: true })}</p>
        </>
      ),
    },
    {
      label: (
        <>
          <p>Sex</p>
          <ExclamationCircleIcon className="ml-2 h-6 w-6 text-emerald-700" aria-hidden="true" />
        </>
      ),
      body: (
        <>
          <p className="mt-1 text-base text-gray-600 first-letter:uppercase">{patient?.gender}</p>
        </>
      ),
    },
    {
      label: 'Pronouns',
      body: (
        <>
          <p className="mt-1 text-base text-gray-600">{patient?.gender === 'female' ? 'She/Her' : 'He/Him'}</p>
        </>
      ),
    },
    {
      label: 'Birthday',
      body: (
        <>
          <p className="mt-1 text-base text-gray-600">{patient?.birthDate && getLocaleDate(patient?.birthDate)}</p>
        </>
      ),
    },
  ];

  const contactItems = [
    {
      label: 'Contacts',
      body: (
        <>
          {patient?.telecom?.map(({ system, use, value }) => (
            <p
              className="mt-1 text-base capitalize text-gray-600"
              key={profileIdGenerator.next().value}
            >{`${system} (${use}): ${value}`}</p>
          ))}
        </>
      ),
    },
    {
      label: 'Address',
      body: (
        <>
          {patient?.address?.map(({ city, line, state }) => (
            <div key={profileIdGenerator.next().value}>
              {line?.map((line) => (
                <p className="mt-1 text-base text-gray-600" key={profileIdGenerator.next().value}>
                  {line}
                </p>
              ))}
              <p className="mt-1 text-base text-gray-600">
                {city}, {state}
              </p>
            </div>
          ))}
        </>
      ),
    },
  ];

  useEffect(() => {
    medplum
      .readResource('Patient', '3e27eaee-2c55-4400-926e-90982df528e9')
      .then((value) => {
        setPatient(value as Patient);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!patient) {
    return <NoData title="Profile" />;
  }

  return (
    <div>
      <GeneralInfo
        title={getName({ hasPrefix: true, firstName: true, lastName: true })}
        image="avatar"
        imageUrl={patient.photo ? patient.photo[0].url : ''}
        imageAlt="profile-image"
      />
      <InfoSection title="Personal Information">
        <TwoColumnsList items={personalItems} />
      </InfoSection>
      <InfoSection title="Contact Information">
        <TwoColumnsList items={contactItems} />
      </InfoSection>
    </div>
  );
}
