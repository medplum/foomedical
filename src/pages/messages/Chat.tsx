import { DocumentArrowDownIcon, DocumentIcon, DocumentPlusIcon } from '@heroicons/react/24/solid';
import { createReference, formatDateTime, formatHumanName, ProfileResource } from '@medplum/core';
import { Attachment, Communication, Patient, Practitioner } from '@medplum/fhirtypes';
import { AttachmentButton, useMedplum, useMedplumProfile } from '@medplum/react';
import React, { useEffect, useRef, useState } from 'react';
import Button from '../../components/Button';
import Loader from '../../components/Loader';

export default function Chat(): JSX.Element | null {
  const medplum = useMedplum();
  const profile = useMedplumProfile() as ProfileResource;
  const subject = `${profile.resourceType}/${profile.id}`;
  const [messages, setMessages] = useState<Communication[]>();
  const [profiles, setProfiles] = useState<ProfileResource[]>([]);
  const [pending, setPending] = useState<boolean>(true);
  const [messageValue, setMessageValue] = useState<string>('');
  const [attachment, setAttachment] = useState<Attachment>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const replyMessage = (): void => {
    textareaRef.current?.focus();
  };

  const createResource = (attachment?: Attachment): void => {
    const payload: any[] = [{ contentString: messageValue }];

    if (attachment) {
      payload.push({
        contentAttachment: {
          contentType: attachment.contentType,
          url: attachment.url,
        },
      });
    }

    medplum
      .createResource({
        resourceType: 'Communication',
        subject: createReference(profile as Patient),
        sender: createReference(profile as Patient),
        payload: payload,
      })
      .then((value) => {
        setMessages([...(messages ? messages : []), value]);
      })
      .then(() => {
        setMessageValue('');
        setAttachment(undefined);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    medplum
      .graphql(
        `
          query GetCommunicationList($subject: String!) {
            CommunicationList(subject: $subject) {
              resourceType
              id
              meta {
                lastUpdated
              }
              payload {
                contentString
                contentAttachment {
                  url
                  contentType
                }
              }
              sender {
                reference
                resource {
                  ... on Patient {
                    resourceType
                    id
                    name {
                      given
                      family
                    }
                  }
                  ... on Practitioner {
                    resourceType
                    id
                    name {
                      given
                      family
                    }
                  }
                }
              }
            }
          }
        `,
        'GetCommunicationList',
        { subject }
      )
      .then((value) => {
        if (value.data.CommunicationList?.length > 0) {
          setMessages(value.data.CommunicationList as Communication[]);
        } else {
          setPending(false);
        }
      })
      .catch((err) => console.error(err));
  }, [medplum, subject]);

  useEffect(() => {
    if (!messages) {
      return;
    }

    const senders: string[] = [];
    messages.forEach((resource) => {
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
        .then((value) => {
          setProfiles((prevState) => [...prevState, value as ProfileResource]);
          setPending(false);
        })
        .catch((err) => console.error(err));
    });
  }, [medplum, messages]);

  return (
    <>
      {!pending ? (
        <>
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
                          {messages && profiles.length > 0 ? (
                            messages.map((resource) => {
                              const profile = profiles.find((profile) => {
                                if (resource?.sender?.reference) {
                                  return profile.id === resource.sender.reference.split('/')[1];
                                }
                              });
                              const getName = (): string => {
                                if (resource.sender?.resource) {
                                  const senderResource = resource.sender.resource as Patient | Practitioner;
                                  return senderResource.name ? formatHumanName(senderResource.name[0]) : '';
                                } else if (resource.sender?.display) {
                                  return resource.sender.display;
                                } else return '';
                              };
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
                                        {(resource.sender?.resource || resource.sender?.display) && (
                                          <a href="#" className="font-medium text-gray-900">
                                            {getName()}
                                          </a>
                                        )}
                                      </div>
                                      {resource?.payload && (
                                        <div className="mt-1 flex flex-col items-start space-y-2 text-sm text-gray-700">
                                          {resource.payload.map((content, contentIndex) => (
                                            <React.Fragment key={contentIndex}>
                                              {content.contentString && <p>{content.contentString}</p>}
                                              {content.contentAttachment?.url && (
                                                <a
                                                  href={content.contentAttachment.url}
                                                  target="_blank"
                                                  rel="noreferrer"
                                                  download
                                                  className="group flex items-center rounded-sm border border-gray-200 px-2 py-1"
                                                >
                                                  <DocumentArrowDownIcon className="mr-1 h-6 w-6 text-teal-600 group-hover:text-teal-700" />
                                                  Download attached file
                                                </a>
                                              )}
                                            </React.Fragment>
                                          ))}
                                        </div>
                                      )}
                                      <div className="mt-2 space-x-2 text-sm">
                                        <span className="font-medium text-gray-500">
                                          {formatDateTime(resource?.meta?.lastUpdated)}
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
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-end space-y-6 bg-gray-50 px-4 pb-6 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-6 sm:px-6">
                      <div>
                        <AttachmentButton onUpload={(value: Attachment) => setAttachment(value)}>
                          {(props) => (
                            <div {...props} className="group flex">
                              <div className="flex items-center rounded-l-md bg-teal-600 px-2 group-hover:bg-teal-700">
                                {attachment ? (
                                  <DocumentIcon className="h-6 w-6 text-white" />
                                ) : (
                                  <DocumentPlusIcon className="h-6 w-6 text-white" />
                                )}
                              </div>
                              <div className="inline-flex items-center justify-center whitespace-nowrap rounded-r-md border border-gray-200 bg-white px-4 py-2 text-gray-700 shadow-sm">
                                {attachment ? attachment.title : 'No file chosen'}
                              </div>
                            </div>
                          )}
                        </AttachmentButton>
                      </div>
                      <Button marginsUtils="ml-0" label="Send" action={() => createResource(attachment)} />
                    </div>
                  </div>
                </section>
              </div>
            </main>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
