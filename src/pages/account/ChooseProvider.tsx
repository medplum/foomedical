import { XMarkIcon } from '@heroicons/react/24/outline';
import { formatHumanName, getReferenceString } from '@medplum/core';
import { Patient, Practitioner } from '@medplum/fhirtypes';
import { useMedplum } from '@medplum/react';
import React, { useState } from 'react';
import Button from '../../components/Button';
import InfoSection from '../../components/InfoSection';
import LinkToPreviousPage from '../../components/LinkToPreviousPage';
import PageTitle from '../../components/PageTitle';

interface PractitionerModalProps {
  practitioner: Practitioner;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PractitionerModal = ({ practitioner, isOpen, setIsOpen }: PractitionerModalProps): JSX.Element | null => {
  const medplum = useMedplum();
  const patient = medplum.getProfile() as Patient;

  if (!isOpen) {
    return null;
  }

  const name = practitioner.name && formatHumanName(practitioner.name[0], { prefix: true });

  const handleClose = (): void => {
    setIsOpen(false);
  };

  const handleClick = (): void => {
    const newPractitioner = {
      display: name,
      reference: `Practitioner/${practitioner.id}`,
    };

    medplum
      .patchResource('Patient', patient.id as string, [
        { op: 'replace', path: '/generalPractitioner', value: [newPractitioner] },
      ])
      .catch((err) => console.error(err));

    handleClose();
  };

  const displayState = isOpen ? 'block' : 'hidden';

  return (
    <>
      <div className={`${displayState} fixed top-0 left-0 h-full w-full bg-black opacity-40`} onClick={handleClose} />
      <div
        className={`${displayState} fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6`}
      >
        <button type="button" onClick={handleClose}>
          <XMarkIcon className="absolute top-2 right-2 h-6 w-6 text-gray-600" />
        </button>
        <div className="flex items-center gap-3">
          {!!practitioner.photo?.length && (
            <img className="h-16 w-16 rounded-full" src={practitioner.photo[0].url} alt={practitioner.photo[0].title} />
          )}
          {name}
        </div>
        <hr className="my-5 text-gray-600" />
        <div className="mb-5">
          <h6 className="text-xl text-gray-800">Office adress</h6>
          {practitioner.address?.map(({ city, line, state }, addressIndex) => (
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
        </div>
        <Button label="Choose this Provider" action={handleClick} marginsUtils="ml-0 mb-5" widthUtils="full" />
      </div>
    </>
  );
};

interface PractitionerItemProps {
  practitioner?: Practitioner;
}

const PractitionerItem = ({ practitioner }: PractitionerItemProps): JSX.Element | null => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!practitioner) return null;

  const handleClick = (): void => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex justify-between p-6">
      <div className="flex items-center gap-3">
        {!!practitioner.photo?.length && (
          <img className="h-8 w-8 rounded-full" src={practitioner.photo[0].url} alt={practitioner.photo[0].title} />
        )}
        <p>{practitioner.name && formatHumanName(practitioner.name[0], { prefix: true })}</p>
      </div>
      <Button label="Learn more" action={handleClick} />
      <PractitionerModal practitioner={practitioner} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};

const ChooseProvider = (): JSX.Element => {
  const medplum = useMedplum();
  const patient = medplum.getProfile() as Patient;
  const practitioners = medplum.search('Practitioner', `patient=${getReferenceString(patient)}`).read();

  return (
    <>
      <LinkToPreviousPage url="/account/provider" label="Provider" />
      <PageTitle title="Primary Care Provider" />
      <p className="mb-5">
        Building a trusted relationship with a Primary Care Provider (PCP) who knows you - and who you feel comfortable
        with - can lead to better long-term health and happines.
      </p>
      <InfoSection title="Providers in your area">
        <div>
          {practitioners.entry?.map(({ resource }) => (
            <PractitionerItem key={resource?.id} practitioner={resource} />
          ))}
        </div>
      </InfoSection>
    </>
  );
};

export default ChooseProvider;
