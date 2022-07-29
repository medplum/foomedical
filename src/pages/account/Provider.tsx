import { formatHumanName } from '@medplum/core';
import { Patient, Practitioner } from '@medplum/fhirtypes';
import { useMedplum } from '@medplum/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GeneralInfo from '../../components/GeneralInfo';
import InfoSection from '../../components/InfoSection';
import PageTitle from '../../components/PageTitle';
import TwoColumnsList from '../../components/TwoColumnsList';

export default function Provider(): JSX.Element {
  const medplum = useMedplum();
  const patient = medplum.getProfile() as Patient;
  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);

  useEffect(() => {
    patient?.generalPractitioner?.forEach((practitioners) => {
      const id = practitioners.reference ? practitioners.reference.split('/') : '';

      medplum
        .readResource('Practitioner', id[1])
        .then((value) => {
          setPractitioners([value as Practitioner]);
        })
        .catch((err) => console.error(err));
    });
  }, [medplum, patient]);

  return (
    <>
      <PageTitle title="My Provider" />
      {practitioners.length > 0 ? (
        practitioners?.map(({ name, photo, address }, practitionerIndex) => {
          const practitionerItems = [
            {
              label: 'Address',
              body: (
                <>
                  {address?.map(({ city, line, state }, addressIndex) => (
                    <div key={addressIndex}>
                      {line?.map((line, lineIndex) => (
                        <p className="text-lg text-gray-600" key={lineIndex}>
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

          return (
            <div className="mb-20 last:mb-0" key={practitionerIndex}>
              <InfoSection title="My Primary Care Provider">
                <div className="mx-auto px-4 py-5 text-center sm:px-6">
                  <GeneralInfo
                    title={name ? formatHumanName(name[0], { prefix: true }) : ''}
                    image="avatar"
                    imageUrl={photo && photo[0].url}
                    imageAlt="profile-image"
                  />
                  <Link
                    to="choose-a-primary-care-povider"
                    className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-emerald-700 px-5 py-3 text-base font-medium text-white hover:bg-emerald-900"
                  >
                    Choose a Primary Care Provider
                  </Link>
                </div>
              </InfoSection>
              {address && (
                <InfoSection title="Home Office">
                  <TwoColumnsList items={practitionerItems} />
                </InfoSection>
              )}
            </div>
          );
        })
      ) : (
        <InfoSection title="My Primary Care Provider">
          <div className="mx-auto px-4 py-5 text-center sm:px-6">
            <GeneralInfo
              title="Hi there, pair with a PCP today."
              subTitle="Members who build lasting relationships with a Primary Care Physician have higher quality lives and control of their health."
              imageUrl="https://cdn4.iconfinder.com/data/icons/professions-1-2/151/3-512.png"
              imageAlt="provider-image"
            />
            <Link
              to="choose-a-primary-care-povider"
              className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-emerald-700 px-5 py-3 text-base font-medium text-white hover:bg-emerald-900"
            >
              Choose a Primary Care Provider
            </Link>
          </div>
        </InfoSection>
      )}
    </>
  );
}
