import { useState, useEffect } from 'react';
import { useMedplum } from '@medplum/react';
import { Link } from 'react-router-dom';
import { formatHumanName } from '@medplum/core';
import InfoSection from '../../components/InfoSection';
import GeneralInfo from '../../components/GeneralInfo';
import TwoColumnsList from '../../components/TwoColumnsList';
import PageTitle from '../../components/PageTitle';
import { Patient, Practitioner } from '@medplum/fhirtypes';
import generateId from '../../helpers/generate-id';

const providerIdGenerator = generateId();

export default function Provider(): JSX.Element {
  const medplum = useMedplum();
  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);

  const patient: Patient = medplum.readResource('Patient', '3e27eaee-2c55-4400-926e-90982df528e9').read();

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
  }, [patient]);

  return (
    <>
      <PageTitle title="My Provider" />
      {practitioners.length > 0 ? (
        practitioners?.map(({ name, photo, address }) => {
          const practitionerItems = [
            {
              label: 'Address',
              body: (
                <>
                  {address?.map(({ city, line, state }) => (
                    <div key={providerIdGenerator.next().value}>
                      {line?.map((line) => (
                        <p className="text-lg text-gray-600" key={providerIdGenerator.next().value}>
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
            <div className="mb-20 last:mb-0" key={providerIdGenerator.next().value}>
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
