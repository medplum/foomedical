import { PhoneIcon } from '@heroicons/react/outline';
import InfoSection from '../../components/InfoSection';
import GeneralInfo from '../../components/GeneralInfo';
import TwoColumnsList from '../../components/TwoColumnsList';
import PageTitle from '../../components/PageTitle';

const providerItems = [
  {
    label: 'Location',
    body: (
      <>
        <h2 className="text-lg font-bold text-gray-900">Pacific Heights</h2>
        <p className="mt-1 text-base text-gray-600">2410 California Street</p>
        <p className="mt-1 text-base text-gray-600">San Francisco, CA 94115</p>
        <div className="mt-4 flex">
          <div className="flex-shrink-0">
            <PhoneIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
          </div>
          <div className="ml-3 text-base text-gray-500">
            <p>888-663-6331</p>
          </div>
        </div>
      </>
    ),
  },
  {
    label: 'Office Hours',
    body: (
      <>
        <p className="text-lg text-gray-600">Mon, Tue, Thu, Fri: 8AM-5PM</p>
        <p className="mt-1 text-base text-gray-600">Wed: 8AM-12:30PM, 1PM-4PM</p>
        <p className="mt-1 text-base text-gray-600">Sat-Sun: Closed</p>
      </>
    ),
  },
  {
    label: 'Lab Hours',
    body: (
      <>
        <p className="text-lg text-gray-600">Mon-Fri: 8AM-4PM</p>
        <p className="mt-1 text-base text-gray-600">Sat-Sun: Closed</p>
      </>
    ),
  },
];

export default function Provider() {
  return (
    <div>
      <PageTitle title="My Provider" />
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
      <InfoSection title="Home Office">
        <TwoColumnsList items={providerItems} />
      </InfoSection>
    </div>
  );
}
