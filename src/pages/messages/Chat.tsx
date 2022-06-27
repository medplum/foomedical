import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { profileContext } from '../../profileContext';
import { useMedplum } from '@medplum/react';
import { formatHumanName, ProfileResource } from '@medplum/core';
import { DocumentAddIcon, DocumentDownloadIcon, DocumentRemoveIcon } from '@heroicons/react/solid';
import getLocaleDate from '../../helpers/get-locale-date';
import Button from '../../components/Button';
import { Binary, Bundle, Communication } from '@medplum/fhirtypes';

export default function Chat(): JSX.Element | null {
  const medplum = useMedplum();
  const profile = useContext(profileContext);
  if (!profile.id || !profile.name) return null;

  const [messages, setMessages] = useState<Bundle<Communication>>();
  const [profiles, setProfiles] = useState<ProfileResource[]>([]);
  const [messageValue, setMessageValue] = useState<string>('');
  const [file, setFile] = useState<File>();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const name = formatHumanName(profile.name[0]);

  const replyMessage = (): void => {
    textareaRef.current?.focus();
  };

  const createResource = (value?: Binary): void => {
    const payload = value
      ? [
          {
            contentString: messageValue,
            contentAttachment: {
              contentType: value.contentType,
              url: value.url,
            },
          },
        ]
      : [
          {
            contentString: messageValue,
          },
        ];

    medplum
      .createResource({
        resourceType: 'Communication',
        subject: {
          display: name,
          reference: `${profile.resourceType}/${profile.id}`,
        },
        sender: {
          display: name,
          reference: `${profile.resourceType}/${profile.id}`,
        },
        payload: payload,
      })
      .then((value) => {
        if (messages?.entry) {
          setMessages({ ...messages, entry: [...messages.entry, { resource: value }] });
        }
      })
      .then(() => {
        setMessageValue('');
        setFile(undefined);
      })
      .catch((err) => console.error(err));
  };

  const createMessage = (): void => {
    if (file) {
      medplum.createBinary(file, file.name, file.type).then((value) => createResource(value));
    } else {
      createResource();
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadFile = (): void => {
    if (file) {
      setFile(undefined);
    } else {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }
  };

  useEffect(() => {
    medplum
      .search('Communication', `subject=${profile.resourceType}/${profile.id}`)
      .then((value) => {
        if (value.entry) {
          setMessages(value);
          const senders: string[] = [];
          value.entry.forEach(({ resource }) => {
            if (resource?.sender?.reference) {
              senders.push(resource.sender.reference);
            }
          });
          const uniqueSenders = [...new Set(senders)];
          uniqueSenders.forEach((reference) => {
            const id = reference.split('/');
            const profileType = id[0] as 'Patient' | 'Practitioner' | 'RelatedPerson';
            medplum
              .readResource(profileType, id[1])
              .then((value) => setProfiles((prevState) => [...prevState, value as ProfileResource]))
              .catch((err) => console.error(err));
          });
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex flex-col justify-between">
      <main className="mb-auto">
        <div className="mx-auto max-w-3xl sm:px-6 lg:max-w-4xl">
          <section aria-labelledby="notes-title">
            <div className="border bg-white sm:overflow-hidden sm:rounded-lg">
              <div className="divide-y divide-gray-200">
                <div className="px-4 py-5 sm:px-6">
                  <h2 id="notes-title" className="text-lg font-medium text-gray-900">
                    Messages
                  </h2>
                </div>
                <div className="px-4 py-6 sm:px-6">
                  <ul role="list" className="space-y-8">
                    {messages?.entry && profiles.length > 0 ? (
                      messages.entry.map(({ resource }) => {
                        const profile = profiles.find((profile) => {
                          if (resource?.sender?.reference) {
                            return profile.id === resource.sender.reference.split('/')[1];
                          }
                        });
                        return (
                          <li key={resource?.id}>
                            <div className="flex space-x-3">
                              {profile?.photo && (
                                <div className="flex-shrink-0">
                                  <img className="h-10 w-10 rounded-full" src={profile.photo[0].url} alt="" />
                                </div>
                              )}
                              <div>
                                <div className="text-sm">
                                  {resource?.sender && (
                                    <a href="#" className="font-medium text-gray-900">
                                      {resource.sender.display}
                                    </a>
                                  )}
                                </div>
                                {resource?.payload && (
                                  <div className="mt-1 flex flex-col items-start space-y-2 text-sm text-gray-700">
                                    {resource.payload[0].contentString && <p>{resource.payload[0].contentString}</p>}
                                    {resource.payload[0].contentAttachment?.url && (
                                      <a
                                        href={resource.payload[0].contentAttachment.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        download
                                        className="group flex items-center rounded-sm border border-gray-200 px-2 py-1"
                                      >
                                        <DocumentDownloadIcon className="mr-1 h-6 w-6 text-teal-600 group-hover:text-teal-700" />
                                        Download attached file
                                      </a>
                                    )}
                                  </div>
                                )}
                                <div className="mt-2 space-x-2 text-sm">
                                  <span className="font-medium text-gray-500">
                                    {getLocaleDate(resource?.meta?.lastUpdated, true, true)}
                                  </span>
                                  <span className="font-medium text-gray-500">&middot;</span>{' '}
                                  <button
                                    type="button"
                                    className="font-medium text-gray-900"
                                    onClick={() => replyMessage()}
                                  >
                                    Reply
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })
                    ) : (
                      <p className="text-md text-center text-gray-700">No messages here yet...</p>
                    )}
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-6 sm:px-6">
                <div className="flex space-x-3">
                  {profile.photo && (
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={profile.photo[0].url} alt="" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div>
                      <label htmlFor="comment" className="sr-only">
                        About
                      </label>
                      <textarea
                        ref={textareaRef}
                        id="comment"
                        name="comment"
                        rows={3}
                        className="block w-full resize-none rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Add a note"
                        value={messageValue}
                        onChange={(e) => setMessageValue(e.target.value)}
                      />
                      <input
                        type="file"
                        id="file"
                        ref={fileInputRef}
                        onChange={handleFileInputChange}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end justify-end space-y-6 bg-gray-50 px-4 pb-6 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-6 sm:px-6">
                <div className="flex">
                  <button
                    className="flex items-center rounded-l-md bg-teal-600 px-2 hover:bg-teal-700"
                    onClick={handleUploadFile}
                  >
                    {file ? (
                      <DocumentRemoveIcon className="h-6 w-6 text-white" />
                    ) : (
                      <DocumentAddIcon className="h-6 w-6 text-white" />
                    )}
                  </button>
                  <div className="inline-flex items-center justify-center whitespace-nowrap rounded-r-md border border-gray-200 bg-white px-4 py-2 text-gray-700 shadow-sm">
                    {file ? file.name : 'No file chosen'}
                  </div>
                </div>
                <Button marginsUtils="ml-0" label="Comment" action={createMessage} />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
