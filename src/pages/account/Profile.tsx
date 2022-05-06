import { ExclamationCircleIcon } from '@heroicons/react/outline';
import InfoSection from '../../components/InfoSection';
import GeneralInfo from '../../components/GeneralInfo';
import TwoColumnsList from '../../components/TwoColumnsList';

const PersonalItems = [
  {
    label: (
      <>
        <p>Legal name</p>
        <ExclamationCircleIcon className="ml-2 h-6 w-6 text-emerald-700 text-gray-400" aria-hidden="true" />
      </>
    ),
    body: (
      <>
        <p className="mt-1 text-base text-gray-600">Cody Ebberson</p>
      </>
    ),
  },
  {
    label: 'Preferred name',
    body: (
      <>
        <p className="mt-1 text-base text-gray-600">Cody</p>
      </>
    ),
  },
  {
    label: (
      <>
        <p>Sex</p>
        <ExclamationCircleIcon className="ml-2 h-6 w-6 text-emerald-700 text-gray-400" aria-hidden="true" />
      </>
    ),
    body: (
      <>
        <p className="mt-1 text-base text-gray-600">Male</p>
      </>
    ),
  },
  {
    label: 'Pronouns',
    body: (
      <>
        <p className="mt-1 text-base text-gray-600">He/Him</p>
      </>
    ),
  },
  {
    label: 'Birthday',
    body: (
      <>
        <p className="mt-1 text-base text-gray-600">June 5, 1982</p>
      </>
    ),
  },
  {
    label: 'Employer',
    body: (
      <>
        <p className="mt-1 text-base text-gray-600">One Medical</p>
      </>
    ),
  },
];

const contactItems = [
  {
    label: 'Phone',
    body: (
      <>
        <p className="mt-1 text-base text-gray-600">Mobile (Preferred) : (415) 999-999</p>
      </>
    ),
  },
  {
    label: 'Address',
    body: (
      <>
        <p className="mt-1 text-base text-gray-600">2477 Sutter St</p>
        <p className="mt-1 text-base text-gray-600">San Francisco, CA</p>
      </>
    ),
  },
  {
    label: 'Emergency Contact',
    body: (
      <>
        <p className="mt-1 text-base text-gray-600">Emergency Contact</p>
      </>
    ),
  },
];

export default function Provider() {
  return (
    <div>
      <GeneralInfo
        title="Cody Ebberson"
        subTitle="Member since 2018"
        imageUrl="https://via.placeholder.com/175"
        imageAlt="profile-image"
      />
      <InfoSection title="Personal Information">
        <TwoColumnsList items={PersonalItems} />
      </InfoSection>
      <InfoSection title="Contact Information">
        <TwoColumnsList items={contactItems} />
      </InfoSection>
    </div>
  );
}
