import { useMedplum } from '@medplum/ui';
import { ClockIcon } from '@heroicons/react/outline';
import InfoSection from '../../components/InfoSection';
import TwoColumnsList from '../../components/TwoColumnsList';
import PageTitle from '../../components/PageTitle';

const membershipItems = [
  {
    label: 'Current plan',
    body: (
      <>
        <p className="mt-1 text-base text-gray-600">Sponsored Membership - $0</p>
        <p className="mt-1 text-lg text-red-500">Expired on Dec 31, 2019</p>
        <p className="mt-1 text-sm text-gray-600">
          Please update your sponsored membership or convert to a personal membership below for just $100/year
        </p>
        <p className="mt-1 text-base text-sky-700">Update Sponsored Membership</p>
        <p className="mt-1 text-base text-sky-700">Convert to Personal Membership</p>
      </>
    ),
  },
];

const accountItems = [
  {
    label: 'Login Email',
    body: (
      <>
        <p className="mt-1 text-base text-gray-600">example@gmail.com</p>
        <p className="mt-1 text-sm text-red-500">Unverified email</p>
        <p className="mt-1 text-base text-sky-700">Send verification email</p>
        <div>
          <p className="mt-1 text-sm text-gray-600">Need help verifying your email? Contact support of</p>
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
        <p className="mt-1 text-base text-sky-700">+ add preferred email</p>
        <p className="mt-1 text-sm text-gray-600">
          Optional - Add a preferred email if you want to receive communications, separate from your login email
        </p>
      </>
    ),
  },
  {
    label: 'Password',
    body: <p>&bull;&bull;&bull;&bull;&bull;&bull;&bull;</p>,
  },
];

const MembershipAndBilling = (): JSX.Element => {
  const medplum = useMedplum();
  medplum.search('Coverage?patient=Patient/3e27eaee-2c55-4400-926e-90982df528e9').then((value) => console.log(value));

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
