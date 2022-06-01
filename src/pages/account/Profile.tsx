import React, { useContext, useEffect, useState, useRef } from 'react';
import { formatHumanName, formatGivenName, formatFamilyName, ProfileResource } from '@medplum/core';
import { Button, useMedplum } from '@medplum/react';
import { profileContext } from '../../profileContext';
import { PencilIcon, CheckIcon, PlusIcon } from '@heroicons/react/solid';
import InfoSection from '../../components/InfoSection';
import GeneralInfo from '../../components/GeneralInfo';
import TwoColumnsList, { TwoColumnsListItemProps } from '../../components/TwoColumnsList';
import Input from '../../components/Input';
import getGender from '../../helpers/get-gender';
import getLocaleDate from '../../helpers/get-locale-date';
import generateId from '../../helpers/generate-id';

const profileIdGenerator = generateId();

export default function Profile() {
  const profile = useContext(profileContext);
  const medplum = useMedplum();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [resource, setResource] = useState<ProfileResource>();

  const [file, setFile] = useState<File>();

  const [personalInfo, setPersonalInfo] = useState<TwoColumnsListItemProps[]>([]);
  const [contactInfo, setContactInfo] = useState<TwoColumnsListItemProps[]>([]);

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

  const handleUploadFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setProfileValues({ ...profileValues, [key]: value });
  };

  const toggleInputButton = (type: string, operations: any[]) => {
    if (activeInputName === type && resource?.id) {
      medplum.patchResource(resource.resourceType, resource.id, operations).then(() => setPending(!pending));
    } else {
      setActiveInputName(type);
    }
  };

  const toggleButtonIcons = (name: string) => {
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
    if (profile.id) {
      medplum
        .readResource(profile.resourceType, profile.id)
        .then((value) => setResource(value as ProfileResource))
        .then(() => setActiveInputName(''))
        .catch((err) => console.error(err));
    }
  }, [profile, pending]);

  useEffect(() => {
    if (file) {
      medplum.createBinary(file, file.name, file.type).then((value) => {
        if (resource && resource.id) {
          if (resource.photo && resource.photo[0].url) {
            medplum
              .patchResource(resource.resourceType, resource.id, [
                { op: 'replace', path: '/photo/0/contentType', value: value.contentType },
                { op: 'replace', path: '/photo/0/title', value: file.name },
                { op: 'replace', path: '/photo/0/url', value: value.url },
              ])
              .then(() => setPending(!pending));
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
              .then(() => setPending(!pending));
          }
        }
      });
    }
  }, [file]);

  useEffect(() => {
    if (resource) {
      const { telecom = [], address = [] } = resource;
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

  useEffect(() => {
    const personalItems = [];
    const contactItems = [];

    if (resource) {
      if (resource.name) {
        personalItems.push(
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
        personalItems.push(
          {
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
          },
          {
            label: 'Pronouns',
            body: <p className="text-lg text-gray-600">{getGender(resource.gender)}</p>,
          }
        );
      } else {
        personalItems.push({
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
        personalItems.push({
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
                  toggleInputButton('birthDate', [
                    { op: 'replace', path: '/birthDate', value: profileValues.birthDate },
                  ]);
                }}
              >
                {toggleButtonIcons('birthDate')}
              </Button>
            </>
          ),
        });
      } else {
        personalItems.push({
          label: 'Birthday',
          body: (
            <>
              {activeInputName === 'birthDate' ? (
                <div className="flex space-x-2">
                  {inputs.birthDate}
                  <Button
                    onClick={() => {
                      toggleInputButton('birthDate', [
                        { op: 'add', path: '/birthDate', value: profileValues.birthDate },
                      ]);
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
        contactItems.push({
          label: 'Contacts',
          body: (
            <>
              {activeInputName === 'contact' ? (
                <div className="flex flex-col space-y-2">{inputs.contact}</div>
              ) : (
                <>
                  {resource.telecom.map(({ system, use, value }) => (
                    <React.Fragment key={profileIdGenerator.next().value}>
                      <span className="text-lg capitalize text-gray-600">
                        {system} ({use}): {value}
                      </span>
                    </React.Fragment>
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
        contactItems.push({
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
        contactItems.push({
          label: 'Address',
          body: (
            <>
              {activeInputName === 'address' ? (
                <div className="flex flex-col space-y-2">{inputs.address}</div>
              ) : (
                <>
                  {resource.address.map(({ city, line, state }) => (
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
        contactItems.push({
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
    }

    setPersonalInfo(personalItems);
    setContactInfo(contactItems);
  }, [resource, profileValues, activeInputName]);

  return (
    <div>
      <GeneralInfo
        title={resource?.name ? formatHumanName(resource?.name[0], { prefix: true }) : ''}
        image="avatar"
        imageUrl={resource?.photo ? resource.photo[0].url : ''}
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
    </div>
  );
}
