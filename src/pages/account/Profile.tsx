import { CheckIcon, PencilIcon, PlusIcon } from '@heroicons/react/24/solid';
import { formatFamilyName, formatGivenName, formatHumanName } from '@medplum/core';
import { Patient, Practitioner } from '@medplum/fhirtypes';
import { Button, useMedplum, useMedplumProfile } from '@medplum/react';
import React, { useEffect, useRef, useState } from 'react';
import GeneralInfo from '../../components/GeneralInfo';
import InfoSection from '../../components/InfoSection';
import Input from '../../components/Input';
import TwoColumnsList, { TwoColumnsListItemProps } from '../../components/TwoColumnsList';
import getLocaleDate from '../../helpers/get-locale-date';

export default function Profile(): JSX.Element | null {
  const medplum = useMedplum();
  const profile = useMedplumProfile() as Patient | Practitioner;
  const resource = medplum.readResource(profile.resourceType, profile.id as string).read();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [profileValues, setProfileValues] = useState({
    given: '',
    family: '',
    gender: '',
    birthDate: '',
    contactSystem: '',
    contactUse: '',
    contactValue: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
  });
  const [activeInputName, setActiveInputName] = useState<string>('');

  const [pending, setPending] = useState<boolean>(false);

  const handleUploadFile = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleInputChange = (key: string, value: string): void => {
    setProfileValues({ ...profileValues, [key]: value });
  };

  const toggleInputButton = (type: string, operations: any[]): void => {
    if (activeInputName === type && resource?.id) {
      medplum.patchResource(resource.resourceType, resource.id, operations).then(() => {
        setPending(!pending);
        setActiveInputName('');
      });
    } else {
      setActiveInputName(type);
    }
  };

  const toggleButtonIcons = (name: string): JSX.Element => {
    if (activeInputName === name) {
      return <CheckIcon className="ml-2 h-8 w-8 self-center text-gray-400 hover:text-emerald-700" />;
    } else {
      return <PencilIcon className="ml-2 h-6 w-6 self-center text-gray-400 hover:text-emerald-700" />;
    }
  };

  const inputs = {
    name: (
      <>
        <Input value={profileValues.given} name="given" handleChange={handleInputChange} placeholder="Given" />
        <Input value={profileValues.family} name="family" handleChange={handleInputChange} placeholder="Family" />
      </>
    ),
    gender: <Input value={profileValues.gender} name="gender" handleChange={handleInputChange} placeholder="Gender" />,
    birthDate: (
      <Input
        type="date"
        name="birthDate"
        value={profileValues.birthDate}
        handleChange={handleInputChange}
        placeholder="Birthday"
      />
    ),
    contact: (
      <>
        <Input
          name="contactSystem"
          value={profileValues.contactSystem}
          handleChange={handleInputChange}
          placeholder="System"
        />
        <Input name="contactUse" value={profileValues.contactUse} handleChange={handleInputChange} placeholder="Use" />
        <Input
          name="contactValue"
          value={profileValues.contactValue}
          handleChange={handleInputChange}
          placeholder="Value"
        />
      </>
    ),
    address: (
      <>
        <Input name="line1" value={profileValues.line1} handleChange={handleInputChange} placeholder="Line 1" />
        <Input name="line2" value={profileValues.line2} handleChange={handleInputChange} placeholder="Line 2" />
        <Input name="city" value={profileValues.city} handleChange={handleInputChange} placeholder="City" />
        <Input name="state" value={profileValues.state} handleChange={handleInputChange} placeholder="State" />
      </>
    ),
  };

  useEffect(() => {
    if (file) {
      medplum.createBinary(file, file.name, file.type).then((value) => {
        if (resource && resource.id) {
          if (resource.photo && resource.photo.length > 0) {
            medplum
              .patchResource(resource.resourceType, resource.id, [
                { op: 'replace', path: '/photo/0/contentType', value: value.contentType },
                { op: 'replace', path: '/photo/0/title', value: file.name },
                { op: 'replace', path: '/photo/0/url', value: value.url },
              ])
              .then(() => {
                setFile(null);
                setPending(!pending);
              });
          } else {
            medplum
              .patchResource(resource.resourceType, resource.id, [
                {
                  op: 'add',
                  path: '/photo',
                  value: [
                    {
                      contentType: value.contentType,
                      title: file.name,
                      url: value.url,
                    },
                  ],
                },
              ])
              .then(() => {
                setFile(null);
                setPending(!pending);
              });
          }
        }
      });
    }
  }, [medplum, file, resource, pending]);

  useEffect(() => {
    if (resource) {
      const { telecom = [{ system: '', use: '', value: '' }], address = [{ line: ['', ''], city: '', state: '' }] } =
        resource;
      const { system, use, value } = telecom[0];
      const { line = [], city, state } = address[0];
      setProfileValues({
        given: resource.name ? formatGivenName(resource.name[0]) : '',
        family: resource.name ? formatFamilyName(resource.name[0]) : '',
        gender: resource.gender || '',
        birthDate: resource.birthDate || '',
        contactSystem: system || '',
        contactUse: use || '',
        contactValue: value || '',
        line1: line[0] || '',
        line2: line[1] || '',
        city: city || '',
        state: state || '',
      });
    }
  }, [resource]);

  const personalInfo: TwoColumnsListItemProps[] = [];
  const contactInfo: TwoColumnsListItemProps[] = [];

  if (resource.name) {
    personalInfo.push(
      {
        label: <p>Legal name</p>,
        body: (
          <>
            {activeInputName === 'name' ? (
              <div className="flex space-x-2">{inputs.name}</div>
            ) : (
              <p className="text-lg text-gray-600">{formatHumanName(resource.name[0])}</p>
            )}
            <Button
              onClick={() =>
                toggleInputButton('name', [
                  { op: 'replace', path: '/name/0/given/0', value: profileValues.given },
                  { op: 'replace', path: '/name/0/family', value: profileValues.family },
                ])
              }
            >
              {toggleButtonIcons('name')}
            </Button>
          </>
        ),
      },
      {
        label: 'Preferred name',
        body: <p className="text-lg text-gray-600">{formatGivenName(resource.name[0])}</p>,
      }
    );
  }
  if (resource.gender) {
    personalInfo.push({
      label: <p>Sex</p>,
      body: (
        <>
          {activeInputName === 'gender' ? (
            <div className="flex space-x-2">{inputs.gender}</div>
          ) : (
            <p className="text-lg text-gray-600">{resource.gender}</p>
          )}
          <Button
            onClick={() => {
              toggleInputButton('gender', [{ op: 'replace', path: '/gender', value: profileValues.gender }]);
            }}
          >
            {toggleButtonIcons('gender')}
          </Button>
        </>
      ),
    });
  } else {
    personalInfo.push({
      label: <p>Sex</p>,
      body: (
        <>
          {activeInputName === 'gender' ? (
            <div className="flex space-x-2">
              {inputs.gender}
              <Button
                onClick={() => {
                  toggleInputButton('gender', [{ op: 'add', path: '/gender', value: profileValues.gender }]);
                }}
              >
                <CheckIcon className="h-8 w-8 self-center text-gray-400 hover:text-emerald-700" />
              </Button>
            </div>
          ) : (
            <Button onClick={() => setActiveInputName('gender')}>
              <div className="flex items-center text-gray-400 hover:text-emerald-700">
                <PlusIcon className="mr-2 h-5 w-5 self-center" aria-hidden="true" />
                <p className="text-lg">add gender information</p>
              </div>
            </Button>
          )}
        </>
      ),
    });
  }
  if (resource.birthDate) {
    personalInfo.push({
      label: 'Birthday',
      body: (
        <>
          {activeInputName === 'birthDate' ? (
            <div className="flex space-x-2">{inputs.birthDate}</div>
          ) : (
            <p className="text-lg text-gray-600">{getLocaleDate(resource.birthDate)}</p>
          )}
          <Button
            onClick={() => {
              toggleInputButton('birthDate', [{ op: 'replace', path: '/birthDate', value: profileValues.birthDate }]);
            }}
          >
            {toggleButtonIcons('birthDate')}
          </Button>
        </>
      ),
    });
  } else {
    personalInfo.push({
      label: 'Birthday',
      body: (
        <>
          {activeInputName === 'birthDate' ? (
            <div className="flex space-x-2">
              {inputs.birthDate}
              <Button
                onClick={() => {
                  toggleInputButton('birthDate', [{ op: 'add', path: '/birthDate', value: profileValues.birthDate }]);
                }}
              >
                <CheckIcon className="h-8 w-8 self-center text-gray-400 hover:text-emerald-700" />
              </Button>
            </div>
          ) : (
            <Button onClick={() => setActiveInputName('birthDate')}>
              <div className="flex items-center text-gray-400 hover:text-emerald-700">
                <PlusIcon className="mr-2 h-5 w-5 self-center" aria-hidden="true" />
                <p className="text-lg">add birth date information</p>
              </div>
            </Button>
          )}
        </>
      ),
    });
  }
  if (resource.telecom) {
    contactInfo.push({
      label: 'Contacts',
      body: (
        <>
          {activeInputName === 'contact' ? (
            <div className="flex flex-col space-y-2">{inputs.contact}</div>
          ) : (
            <>
              {resource.telecom.map(({ system, use, value }, telecomIndex) => (
                <span key={telecomIndex} className="text-lg text-gray-600">
                  <span className="capitalize">{system}</span> ({use}): {value}
                </span>
              ))}
            </>
          )}
          <Button
            onClick={() => {
              toggleInputButton('contact', [
                { op: 'replace', path: '/telecom/0/system', value: profileValues.contactSystem },
                { op: 'replace', path: '/telecom/0/use', value: profileValues.contactUse },
                { op: 'replace', path: '/telecom/0/value', value: profileValues.contactValue },
              ]);
            }}
          >
            {toggleButtonIcons('contact')}
          </Button>
        </>
      ),
    });
  } else {
    contactInfo.push({
      label: 'Contacts',
      body: (
        <>
          {activeInputName === 'contact' ? (
            <div className="flex space-x-2">
              <div className="flex flex-col space-y-2">{inputs.contact}</div>
              <Button
                onClick={() => {
                  toggleInputButton('contact', [
                    {
                      op: 'add',
                      path: '/telecom',
                      value: [
                        {
                          system: profileValues.contactSystem,
                          use: profileValues.contactUse,
                          value: profileValues.contactValue,
                        },
                      ],
                    },
                  ]);
                }}
              >
                <CheckIcon className="h-8 w-8 self-center text-gray-400 hover:text-emerald-700" />
              </Button>
            </div>
          ) : (
            <Button onClick={() => setActiveInputName('contact')}>
              <div className="flex items-center text-gray-400 hover:text-emerald-700">
                <PlusIcon className="mr-2 h-5 w-5 self-center" aria-hidden="true" />
                <p className="text-lg">add contact information</p>
              </div>
            </Button>
          )}
        </>
      ),
    });
  }
  if (resource.address) {
    contactInfo.push({
      label: 'Address',
      body: (
        <>
          {activeInputName === 'address' ? (
            <div className="flex flex-col space-y-2">{inputs.address}</div>
          ) : (
            <>
              {resource.address.map(({ city, line, state }, addressIndex) => (
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
          )}
          <Button
            onClick={() => {
              toggleInputButton('address', [
                { op: 'replace', path: '/address/0/line/0', value: profileValues.line1 },
                { op: 'replace', path: '/address/0/line/1', value: profileValues.line2 },
                { op: 'replace', path: '/address/0/city', value: profileValues.city },
                { op: 'replace', path: '/address/0/state', value: profileValues.state },
              ]);
            }}
          >
            {toggleButtonIcons('address')}
          </Button>
        </>
      ),
    });
  } else {
    contactInfo.push({
      label: 'Address',
      body: (
        <>
          {activeInputName === 'address' ? (
            <div className="flex space-x-2">
              <div className="flex flex-col space-y-2">{inputs.address}</div>
              <Button
                onClick={() => {
                  toggleInputButton('address', [
                    {
                      op: 'add',
                      path: '/address',
                      value: [
                        {
                          city: profileValues.city,
                          line: [profileValues.line1, profileValues.line2],
                          state: profileValues.state,
                        },
                      ],
                    },
                  ]);
                }}
              >
                <CheckIcon className="h-8 w-8 self-center text-gray-400 hover:text-emerald-700" />
              </Button>
            </div>
          ) : (
            <Button onClick={() => setActiveInputName('address')}>
              <div className="flex items-center text-gray-400 hover:text-emerald-700">
                <PlusIcon className="mr-2 h-5 w-5 self-center" aria-hidden="true" />
                <p className="text-lg">add address information</p>
              </div>
            </Button>
          )}
        </>
      ),
    });
  }

  return (
    <>
      <GeneralInfo
        title={resource?.name ? formatHumanName(resource?.name[0], { prefix: true }) : ''}
        image="avatar"
        imageUrl={resource?.photo && resource.photo.length > 0 ? resource.photo[0].url : ''}
        onImageClick={handleUploadFile}
        imageAlt="profile-image"
      />
      <input type="file" id="file" ref={fileInputRef} onChange={handleFileInputChange} className="hidden" />
      <InfoSection title="Personal Information">
        <TwoColumnsList items={personalInfo} />
      </InfoSection>
      <InfoSection title="Contact Information">
        <TwoColumnsList items={contactInfo} />
      </InfoSection>
    </>
  );
}
