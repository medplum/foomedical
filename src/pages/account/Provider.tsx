import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatHumanName } from '@medplum/core';
import { Patient, Practitioner } from '@medplum/fhirtypes';
import { useMedplum } from '@medplum/react';
import GeneralInfo from '../../components/GeneralInfo';
import InfoSection from '../../components/InfoSection';
import PageTitle from '../../components/PageTitle';
import TwoColumnsList from '../../components/TwoColumnsList';
import Loader from '../../components/Loader';

interface ContentBlockProps {
  title: string;
  infoTitle: string;
  subTitle?: string;
  imageType?: 'image' | 'avatar';
  imageUrl?: string;
  imageAlt: string;
  linkUrl: string;
  linkLabel: string;
}

const ContentBlock = ({
  title,
  infoTitle,
  subTitle,
  imageType,
  imageUrl,
  imageAlt,
  linkUrl,
  linkLabel,
}: ContentBlockProps): JSX.Element => (
  <InfoSection title={title}>
    <div className="mx-auto px-4 py-5 text-center sm:px-6">
      <GeneralInfo title={infoTitle} subTitle={subTitle} image={imageType} imageUrl={imageUrl} imageAlt={imageAlt} />
      <Link
        to={linkUrl}
        className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-teal-600 px-5 py-3 text-base font-medium text-white hover:bg-teal-700"
      >
        {linkLabel}
      </Link>
    </div>
  </InfoSection>
);

export default function Provider(): JSX.Element {
  const medplum = useMedplum();
  const patient = medplum.getProfile() as Patient;
  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);
  const [pending, setPending] = useState<boolean>(true);

  useEffect(() => {
    if (patient?.generalPractitioner?.length) {
      patient.generalPractitioner.forEach((practitioners) => {
        const id = practitioners.reference ? practitioners.reference.split('/') : '';

        medplum
          .readResource('Practitioner', id[1])
          .then((value) => {
            setPractitioners([value as Practitioner]);
            setPending(false);
          })
          .catch((err) => console.error(err));
      });
    } else {
      setPending(false);
    }
  }, [medplum, patient]);

  const renderContent = (): JSX.Element => (
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
              <ContentBlock
                key={practitionerIndex}
                title="My Primary Care Provider"
                infoTitle={name ? formatHumanName(name[0], { prefix: true }) : ''}
                imageType="avatar"
                imageUrl={photo && photo[0].url}
                imageAlt="profile-image"
                linkUrl="choose-a-primary-care-provider"
                linkLabel="Choose a Primary Care Provider"
              />
              {address && (
                <InfoSection title="Home Office">
                  <TwoColumnsList items={practitionerItems} />
                </InfoSection>
              )}
            </div>
          );
        })
      ) : (
        <ContentBlock
          title="My Primary Care Provider"
          infoTitle="Hi there, pair with a PCP today."
          subTitle="Members who build lasting relationships with a Primary Care Physician have higher quality lives and control of their health."
          imageUrl="https://cdn4.iconfinder.com/data/icons/professions-1-2/151/3-512.png"
          imageAlt="provider-image"
          linkUrl="choose-a-primary-care-provider"
          linkLabel="Choose a Primary Care Provider"
        />
      )}
    </>
  );

  return <>{!pending ? renderContent() : <Loader />}</>;
}
