import { useState } from 'react';
import { useMedplum } from '@medplum/react';
import { formatHumanName } from '@medplum/core';
import { Bundle, Practitioner } from '@medplum/fhirtypes';
import { XIcon } from '@heroicons/react/outline';
import LinkToPreviousPage from '../../components/LinkToPreviousPage';
import PageTitle from '../../components/PageTitle';
import InfoSection from '../../components/InfoSection';
import Button from '../../components/Button';
import generateId from '../../helpers/generate-id';

const idGenerator = generateId();

const patientId = '3e27eaee-2c55-4400-926e-90982df528e9';

interface PractitionerModalProps {
  practitioner: Practitioner;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PractitionerModal = ({ practitioner, isOpen, setIsOpen }: PractitionerModalProps): JSX.Element | null => {
  if (!isOpen) return null;
  const medplum = useMedplum();

  const name = practitioner.name && formatHumanName(practitioner.name[0], { prefix: true });

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClick = async () => {
    const newPractitioner = {
      display: name,
      reference: `Practitioner/${practitioner.id}`,
    };

    await medplum
      .patchResource('Patient', patientId, [{ op: 'replace', path: '/generalPractitioner', value: [newPractitioner] }])
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
          <XIcon className="absolute top-2 right-2 h-6 w-6 text-gray-600" />
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
          {practitioner.address?.map(({ city, line, state }) => (
            <div key={idGenerator.next().value}>
              {line?.map((line) => (
                <p className="text-lg text-gray-600" key={idGenerator.next().value}>
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

  const handleClick = () => {
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

  const practitioners: Bundle<Practitioner> = medplum
    .search<Practitioner>(`Practitioner?patient=Patient/${patientId}`)
    .read();

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
