import { useContext } from 'react';
import { formatHumanName, formatGivenName } from '@medplum/core';
import { profileContext } from '../../profileContext';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import InfoSection from '../../components/InfoSection';
import GeneralInfo from '../../components/GeneralInfo';
import TwoColumnsList from '../../components/TwoColumnsList';
import NoData from '../../components/NoData';
import getLocaleDate from '../../helpers/get-locale-date';
import generateId from '../../helpers/generate-id';

const profileIdGenerator = generateId();

export default function Profile() {
  const profile = useContext(profileContext);

  const personalItems = [
    {
      label: (
        <>
          <p>Legal name</p>
          <ExclamationCircleIcon className="ml-2 h-6 w-6 self-center text-emerald-700" aria-hidden="true" />
        </>
      ),
      body: (
        <>
          <p className="text-lg text-gray-600">{profile?.name ? formatHumanName(profile?.name[0]) : ''}</p>
        </>
      ),
    },
    {
      label: 'Preferred name',
      body: (
        <>
          <p className="text-lg text-gray-600">{profile?.name ? formatGivenName(profile?.name[0]) : ''}</p>
        </>
      ),
    },
    {
      label: (
        <>
          <p>Sex</p>
          <ExclamationCircleIcon className="ml-2 h-6 w-6 self-center text-emerald-700" aria-hidden="true" />
        </>
      ),
      body: (
        <>
          <p className="text-lg text-gray-600 first-letter:uppercase">{profile?.gender}</p>
        </>
      ),
    },
    {
      label: 'Pronouns',
      body: (
        <>
          <p className="text-lg text-gray-600">{profile?.gender === 'female' ? 'She/Her' : 'He/Him'}</p>
        </>
      ),
    },
    {
      label: 'Birthday',
      body: (
        <>
          <p className="text-lg text-gray-600">{profile?.birthDate && getLocaleDate(profile?.birthDate)}</p>
        </>
      ),
    },
  ];

  const contactItems = [
    {
      label: 'Contacts',
      body: (
        <>
          {profile?.telecom?.map(({ system, use, value }) => (
            <p
              className="text-lg capitalize text-gray-600"
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
          {profile?.address?.map(({ city, line, state }) => (
            <div key={profileIdGenerator.next().value}>
              {line?.map((line) => (
                <p className="text-lg text-gray-600" key={profileIdGenerator.next().value}>
                  {line}
                </p>
              ))}
              <p className="text-lg text-gray-600">
                {city}, {state}
              </p>
            </div>
          ))}
        </>
      ),
    },
  ];

  if (!profile) {
    return <NoData title="Profile" />;
  }

  return (
    <div>
      <GeneralInfo
        title={profile?.name ? formatHumanName(profile?.name[0], { prefix: true }) : ''}
        image="avatar"
        imageUrl={profile.photo ? profile.photo[0].url : ''}
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
