import { useMedplumProfile } from '@medplum/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { GiftIcon, XIcon } from '@heroicons/react/outline';
import Button from '../components/Button';
import Carousel from '../components/Carousel';
import { formatHumanName, ProfileResource } from '@medplum/core';
import { ReactComponent as MedplumImage } from '../img/homePage/medplum.svg';
import PeopleTalkImage from '../img/homePage/people-talk.jpg';
import HealthVisitImage from '../img/homePage/health-visit.jpg';
import { ReactComponent as BetterSleepImage } from '../img/homePage/better-sleep.svg';
import { ReactComponent as HealthRecordImage } from '../img/homePage/health-record.svg';
import { ReactComponent as PillImage } from '../img/homePage/pill.svg';
import { ReactComponent as PharmacyImage } from '../img/homePage/pharmacy.svg';
import { ReactComponent as DoctorImage } from '../img/homePage/doctor.svg';

const carouselItems = [
  {
    img: <MedplumImage className="h-auto w-4/12 rounded-full" />,
    title: 'Welcome to Foo Medical',
    description:
      'Lorem ipsum at porta donec ultricies ut, arcu morbi amet arcu ornare, curabitur pharetra magna tempus',
    url: '/get-care',
    label: 'Learn how we help',
  },
  {
    img: <MedplumImage className="h-auto w-4/12 rounded-full" />,
    title: 'Verify Email',
    description:
      'Lorem ipsum at porta donec ultricies ut, arcu morbi amet arcu ornare, curabitur pharetra magna tempus',
    url: '/account',
    label: 'Send verification email',
  },
  {
    img: <MedplumImage className="h-auto w-4/12 rounded-full" />,
    title: 'Select a PCP',
    description:
      'Lorem ipsum at porta donec ultricies ut, arcu morbi amet arcu ornare, curabitur pharetra magna tempus',
    url: '/account/provider/choose-a-primary-care-povider',
    label: 'Choose a Primary Care Provider',
  },
  {
    img: <MedplumImage className="h-auto w-4/12 rounded-full" />,
    title: 'Emergency Contact',
    description:
      'Lorem ipsum at porta donec ultricies ut, arcu morbi amet arcu ornare, curabitur pharetra magna tempus',
    url: '/account',
    label: 'Add emergency contact',
  },
];

const linkPages = [
  {
    img: <HealthRecordImage className="h-auto w-24" />,
    title: 'Health Record',
    description: '',
    href: '/health-record',
  },
  {
    img: <PillImage className="h-auto w-24" />,
    title: 'Request Prescription Renewal',
    description: '',
    href: '/health-record/medications',
  },
  {
    img: <PharmacyImage className="h-auto w-24" />,
    title: 'Preferred Pharmacy',
    description: 'Walgreens D2866 1363 Divisadero St  DIVISADERO',
    href: '#',
  },
];

const recommendations = [
  {
    title: 'Get travel health recommendations',
    description: 'Find out what vaccines and meds you need for your trip.',
  },
  {
    title: 'Get FSA/HSA reimbursement',
    description: 'Request a prescription for over-the-counter items.',
  },
  {
    title: 'Request health record',
    description: 'Get records sent to or from Foo Medical.',
  },
];

export function HomePage(): JSX.Element {
  const profile = useMedplumProfile() as ProfileResource;
  const profileName = profile.name ? formatHumanName(profile.name[0]) : '';

  return (
    <div>
      <Header />
      <div className="flex justify-center bg-sky-100 py-4 px-6 text-sm text-gray-600">
        <span>
          Put announcement text here.{' '}
          <a href="#" className="font-semibold text-sky-700">
            Links are useful as well.
          </a>
        </span>
      </div>
      <section className="mx-auto max-w-7xl px-6 md:px-8 lg:px-16">
        <div className="flex flex-col items-center justify-center space-y-6 pt-6 md:flex-row md:justify-between md:space-x-6 md:pt-0">
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-4">
              <h1 className="text-center text-3xl font-extrabold md:text-left">
                <p>Hi {profileName},</p>
                <p>let&apos;s get started.</p>
              </h1>
            </div>
            <Button url="/get-care" label="Appointments" marginsUtils="m-0" paddingUtils="px-8 py-2" />
          </div>
          <img className="max-h-72 w-auto" src={PeopleTalkImage} alt="People talk photo" />
        </div>
      </section>
      <div className="w-full bg-teal-900 py-4">
        <div className="flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div className="flex items-center justify-start space-x-1 font-medium text-white">
            <GiftIcon className="h-8 w-8 stroke-1 text-lime-600" />
            <p>Put notices in this banner</p>
          </div>
          <Button label="Take Action" url="#" marginsUtils="m-0" />
        </div>
      </div>
      <div className="w-full bg-stone-100">
        <section className="mx-auto max-w-7xl px-6 py-10 md:px-8 lg:px-16">
          <Carousel items={carouselItems} />
          <div className="relative mt-10 flex w-full flex-col items-center justify-center space-y-4 border border-gray-400 bg-white p-4 sm:justify-start md:flex-row md:items-start md:space-x-4 md:space-y-0">
            <BetterSleepImage className="h-auto w-24 flex-none rounded-full" />
            <div className="flex flex-col items-center md:items-start">
              <div className="mb-2 text-center md:text-left">
                <h2 className="mb-2 text-lg font-bold">Better rest, better health</h2>
                <p className="mb-2 text-sm">
                  Lorem ipsum at porta donec ultricies ut, arcu morbi amet arcu ornare, curabitur pharetra magna tempus
                  porttitor, auctor. Tellus rutrum sagittis, enim, nulla auctor mattis, magna urna commodo: amet.
                  Sagittis, pharetra congue&nbsp;&mdash; bibendum, sit odio vulputate eget, massa nec, eros. Porta, sit
                  sapien, sem porttitor nulla quam justo tellus diam congue.
                </p>
              </div>
              <Button
                url="/get-care"
                label="Book Physical"
                marginsUtils="m-0"
                textColorUtils="text-teal-600"
                backgroundColorUtils="bg-white"
                borderColorUtils="border-teal-600"
                hoverUtils="bg-zinc-200"
              />
              <a href="#" className="absolute top-4 right-4">
                <XIcon className="h-auto w-6 cursor-pointer stroke-1 text-gray-600" />
              </a>
            </div>
          </div>
          <div className="relative mt-10 flex w-full flex-col items-center justify-center border border-gray-400 bg-white md:flex-row md:justify-start">
            <div className="relative h-56 w-full md:h-80">
              <img
                className="absolute inset-0 h-full w-full object-cover"
                src={HealthVisitImage}
                alt="Health visit photo"
              />
            </div>
            <div className="flex w-full flex-none flex-col items-center justify-center p-4 md:w-3/5 md:items-start md:justify-start">
              <div className="bg-emerald-300 p-1">
                <h3 className="text-xs font-bold uppercase text-green-700">Now available</h3>
              </div>
              <div className="text-center md:text-left">
                <h2 className="mt-2 text-lg font-bold">Remote Dermatology Visit</h2>
                <p className="mt-2 mb-4 text-sm">
                  Lorem ipsum at porta donec ultricies ut, arcu morbi amet arcu ornare, curabitur pharetra magna tempus
                  porttitor, auctor. Tellus rutrum sagittis, enim, nulla auctor mattis, magna urna commodo: amet.
                  Sagittis, pharetra congue&nbsp;&mdash; bibendum, sit odio vulputate eget, massa nec, eros. Porta, sit
                  sapien, sem porttitor nulla quam justo tellus diam congue.
                </p>
              </div>
              <div className="flex flex-col md:flex-row">
                <Button
                  label="Book an appointment"
                  url="#"
                  marginsUtils="m-0"
                  textColorUtils="text-teal-600"
                  backgroundColorUtils="bg-white"
                  borderColorUtils="border-teal-600"
                  hoverUtils="bg-stone-300"
                />
                <a
                  href="#"
                  className="mt-4 flex items-center justify-center border-0 px-4 py-1 text-base font-medium text-blue-700 hover:text-zinc-900 md:mt-0"
                >
                  Learn more
                </a>
              </div>
            </div>
            <a href="#" className="absolute top-4 right-4 h-8">
              <XIcon className="h-auto w-6 stroke-1 text-gray-600" />
            </a>
          </div>
          <div className="mt-10 flex w-full flex-col justify-center space-y-4 text-lg md:flex-row md:items-stretch md:space-y-0 md:space-x-4">
            {linkPages.map(({ href, img, title, description }) => (
              <a
                key={title}
                href={href}
                className="flex h-auto w-full flex-col items-center justify-center space-y-4 border border-gray-400 bg-white p-4 text-center"
              >
                {img}
                <div>
                  <h2 className="font-bold">{title}</h2>
                  {description && <p className="text-sm">{description}</p>}
                </div>
              </a>
            ))}
          </div>
          <div className="mt-10 flex w-full flex-col justify-center space-y-6 md:flex-row md:justify-start md:space-y-0 md:space-x-6">
            <div className="flex w-full flex-col items-center space-y-4 border border-gray-400 bg-white p-4 md:w-2/4 md:flex-row md:items-start md:space-x-2 md:space-y-0">
              <DoctorImage className="h-auto w-28 rounded-full" />
              <div className="space-y-4 text-center md:text-left">
                <h2 className="text-lg font-bold">Primary Care Provider</h2>
                <p>Having a consistent, trusted provider can lead to better health.</p>
                <Button
                  label="Choose Provider"
                  url="account/provider"
                  marginsUtils="m-0"
                  textColorUtils="text-teal-600"
                  backgroundColorUtils="bg-white"
                  borderColorUtils="border-teal-600"
                  hoverUtils="bg-stone-300"
                />
              </div>
            </div>
            <div className="w-full border border-gray-400 bg-white text-sm md:w-2/4">
              {recommendations.map((item) => (
                <a
                  key={item.title}
                  href="#"
                  className="block border-gray-400 p-4 text-center even:border-y md:text-left"
                >
                  <h2 className="font-bold">{item.title}</h2>
                  <p>{item.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
