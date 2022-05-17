import React, { useContext, useEffect, useState } from 'react';
import { formatHumanName, formatGivenName } from '@medplum/core';
import { profileContext } from '../../profileContext';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import InfoSection from '../../components/InfoSection';
import GeneralInfo from '../../components/GeneralInfo';
import TwoColumnsList, { TwoColumnsListItemProps } from '../../components/TwoColumnsList';
import getGender from '../../helpers/get-gender';
import getLocaleDate from '../../helpers/get-locale-date';
import generateId from '../../helpers/generate-id';

const profileIdGenerator = generateId();

export default function Profile() {
  const profile = useContext(profileContext);
  const [personalInfo, setPersonalInfo] = useState<TwoColumnsListItemProps[]>([]);
  const [contactInfo, setContactInfo] = useState<TwoColumnsListItemProps[]>([]);

  useEffect(() => {
    const personalItems = [];
    const contactItems = [];

    if (profile.name) {
      personalItems.push(
        {
          label: (
            <>
              <p>Legal name</p>
              <ExclamationCircleIcon className="ml-2 h-6 w-6 self-center text-emerald-700" aria-hidden="true" />
            </>
          ),
          body: <p className="text-lg text-gray-600">{formatHumanName(profile.name[0])}</p>,
        },
        {
          label: 'Preferred name',
          body: <p className="text-lg text-gray-600">{formatGivenName(profile.name[0])}</p>,
        }
      );
    }
    if (profile.gender) {
      personalItems.push(
        {
          label: (
            <>
              <p>Sex</p>
              <ExclamationCircleIcon className="ml-2 h-6 w-6 self-center text-emerald-700" aria-hidden="true" />
            </>
          ),
          body: <p className="text-lg text-gray-600 first-letter:uppercase">{profile.gender}</p>,
        },
        {
          label: 'Pronouns',
          body: <p className="text-lg text-gray-600">{getGender(profile.gender)}</p>,
        }
      );
    }
    if (profile.birthDate) {
      personalItems.push({
        label: 'Birthday',
        body: <p className="text-lg text-gray-600">{getLocaleDate(profile.birthDate)}</p>,
      });
    }
    if (profile.telecom) {
      contactItems.push({
        label: 'Contacts',
        body: (
          <>
            {profile.telecom.map(({ system, use, value }) => (
              <React.Fragment key={profileIdGenerator.next().value}>
                <span className="text-lg capitalize text-gray-600">{system} </span>
                <span className="text-lg capitalize text-gray-600">({use}): </span>
                <span className="text-lg text-gray-600">{value}</span>
              </React.Fragment>
            ))}
          </>
        ),
      });
    }
    if (profile.address) {
      contactItems.push({
        label: 'Address',
        body: (
          <>
            {profile.address.map(({ city, line, state }) => (
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
      });
    }

    setPersonalInfo(personalItems);
    setContactInfo(contactItems);
  }, [profile]);

  return (
    <div>
      <GeneralInfo
        title={profile?.name ? formatHumanName(profile?.name[0], { prefix: true }) : ''}
        image="avatar"
        imageUrl={profile.photo ? profile.photo[0].url : ''}
        imageAlt="profile-image"
      />
      <InfoSection title="Personal Information">
        <TwoColumnsList items={personalInfo} />
      </InfoSection>
      <InfoSection title="Contact Information">
        <TwoColumnsList items={contactInfo} />
      </InfoSection>
    </div>
  );
}
