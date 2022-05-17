import { useState, useEffect } from 'react';
import { useMedplum } from '@medplum/ui';
import { formatHumanName, formatGivenName } from '@medplum/core';
import InfoSection from '../../components/InfoSection';
import GeneralInfo from '../../components/GeneralInfo';
import TwoColumnsList from '../../components/TwoColumnsList';
import PageTitle from '../../components/PageTitle';
import { Patient, Practitioner } from '@medplum/fhirtypes';
import generateId from '../../helpers/generate-id';

const providerIdGenerator = generateId();

export default function Provider() {
  const medplum = useMedplum();
  const [patient, setPatient] = useState<Patient>();
  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);

  useEffect(() => {
    medplum
      .readResource('Patient', '7bd38ca4-bbda-4781-b2f3-9bcdd364b604')
      .then((value) => {
        setPatient(value as Patient);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    patient?.generalPractitioner?.forEach((practitioners) => {
      const id = practitioners.reference ? practitioners.reference.split('/') : '';
      medplum
        .readResource(id[0], id[1])
        .then((value) => {
          setPractitioners((prevPractitioners) => [...prevPractitioners, value as Practitioner]);
        })
        .catch((err) => console.error(err));
    });
  }, [patient]);

  return (
    <div>
      <PageTitle title="My Provider" />
      {practitioners.length === 0 ? (
        <InfoSection title="My Primary Care Provider">
          <div className="mx-auto px-4 py-5 text-center sm:px-6">
            <GeneralInfo
              title="Hi there, pair with a PCP today."
              subTitle="Members who build lasting relationships with a Primary Care Physician have higher quality lives and control of their health."
              imageUrl="https://via.placeholder.com/175"
              imageAlt="provider-image"
            />
            <a
              href="#"
              className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-emerald-700 px-5 py-3 text-base font-medium text-white hover:bg-emerald-900"
            >
              Choose a Primary Care Provider
            </a>
          </div>
        </InfoSection>
      ) : (
        <>
          {practitioners.map(({ name, photo, address }) => {
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
              <div className="mb-20" key={providerIdGenerator.next().value}>
                <InfoSection title="My Primary Care Provider">
                  <GeneralInfo
                    title={name ? formatHumanName(name[0], { prefix: true }) : ''}
                    image="avatar"
                    imageUrl={photo && photo[0].url}
                    imageAlt="profile-image"
                  />
                </InfoSection>
                <InfoSection title="Home Office">
                  <TwoColumnsList items={practitionerItems} />
                </InfoSection>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
