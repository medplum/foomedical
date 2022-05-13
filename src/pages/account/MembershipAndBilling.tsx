import { ClockIcon } from '@heroicons/react/outline';
import { useMedplum } from '@medplum/ui';
import InfoSection from '../../components/InfoSection';
import TwoColumnsList from '../../components/TwoColumnsList';
import PageTitle from '../../components/PageTitle';

const membershipItems = [
  {
    label: 'Current plan',
    body: (
      <>
        <p className="mb-1 text-lg text-gray-600">Sponsored Membership - $0</p>
        <p className="mb-1 text-lg text-red-500">Expired on Dec 31, 2019</p>
        <p className="mb-1 text-sm text-gray-600">
          Please update your sponsored membership or convert to a personal membership below for just $100/year
        </p>
        <a href="#" className="mb-1 block text-base text-sky-700">
          Update Sponsored Membership
        </a>
        <a href="#" className="mb-1 block text-base text-sky-700">
          Convert to Personal Membership
        </a>
      </>
    ),
  },
];

const accountItems = [
  {
    label: 'Login Email',
    body: (
      <>
        <input className="mb-1 border-none p-0 text-lg text-gray-600" type="email" value="example@gmail.com" />
        <p className="mb-1 text-sm text-red-500">Unverified email</p>
        <a href="#" className="mb-1 text-base text-sky-700">
          Send verification email
        </a>
        <div>
          <p className="mb-1 text-sm text-gray-600">Need help verifying your email? Contact support of</p>
          <p className="mt-0 text-sm text-gray-600">
            <a href="mailto:helpsupport@medplum.com" className="text-base text-sky-700">
              helpsupport@medplum.com
            </a>
            &nbsp;or call 8-036-346-56
          </p>
        </div>
      </>
    ),
  },
  {
    label: 'Preferred Email',
    body: (
      <>
        <button className="mb-1 text-lg text-sky-700">+ add preferred email</button>
        <p className="mb-1 text-sm text-gray-600">
          Optional - Add a preferred email if you want to receive communications, separate from your login email
        </p>
      </>
    ),
  },
  {
    label: 'Password',
    body: <input className="border-none p-0" type="password" value="&bull;&bull;&bull;&bull;&bull;&bull;&bull;" />,
  },
];

const MembershipAndBilling = (): JSX.Element => {
  return (
    <div>
      <PageTitle title="Membership & Billing" />
      <div>
        <div className="mb-5 flex items-center text-red-500">
          <ClockIcon className="mr-1.5 h-7 w-7 flex-shrink-0" />
          <p className="text-lg text-red-500">
            Your sponsored membership has expired. Please make updates below to renew.
          </p>
        </div>
        <InfoSection title="Membership">
          <TwoColumnsList items={membershipItems} />
        </InfoSection>
        <InfoSection title="Account Information">
          <TwoColumnsList items={accountItems} />
        </InfoSection>
      </div>
    </div>
  );
};

export default MembershipAndBilling;
