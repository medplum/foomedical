import { useState, useEffect } from 'react';
import { useMedplum } from '@medplum/react';
import { Bundle, Coverage, PaymentNotice } from '@medplum/fhirtypes';
import PageTitle from '../../components/PageTitle';
import InfoSection from '../../components/InfoSection';
import TwoColumnsList from '../../components/TwoColumnsList';

const MembershipAndBilling = (): JSX.Element => {
  const medplum = useMedplum();

  const [paymentBundle, setPaymentBundle] = useState<Bundle<PaymentNotice> | null>(null);
  const [resources, setResources] = useState<Coverage[]>([]);
  const [pending, setPending] = useState<boolean>(false);

  const coverageBundle = medplum.search('Coverage', 'patient=Patient/3e27eaee-2c55-4400-926e-90982df528e9').read();

  const getCoverageStatus = (status: string): JSX.Element | string => {
    if (status === 'active') {
      return <span className="text-emerald-700">{status}</span>;
    } else if (status === 'cancelled') {
      return <span className="text-red-700">{status}</span>;
    } else {
      return status;
    }
  };

  const handleCancelButton = (id: string): void => {
    medplum
      .patchResource('Coverage', id, [{ op: 'replace', path: '/status', value: 'cancelled' }])
      .then(() => setPending(!pending))
      .catch((err) => console.error(err));
  };

  const handleViewPayments = (): void => {
    medplum
      .search('PaymentNotice', 'resource=Patient/3e27eaee-2c55-4400-926e-90982df528e9')
      .then((value) => setPaymentBundle(value as Bundle<PaymentNotice>))
      .then(() => console.log(paymentBundle))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const bundleItems: Coverage[] = [];
    if (coverageBundle?.entry) {
      coverageBundle.entry.forEach(({ resource }) => {
        if (resource?.id) {
          medplum
            .readResource('Coverage', resource.id)
            .then((value) => bundleItems.push(value as Coverage))
            .then(() => setResources(bundleItems))
            .catch((err) => console.error(err));
        }
      });
    }
  }, [coverageBundle, pending]);

  return (
    <>
      <PageTitle title="Membership & Billing" />
      {resources.map(({ id, payor, type, subscriberId, status }) => (
        <InfoSection
          title="Medical Billing"
          key={id}
          onButtonClick={status === 'active' ? handleCancelButton : undefined}
          id={id}
        >
          <TwoColumnsList
            items={[
              {
                label: 'Insurance',
                body: (
                  <div className="flex flex-col">
                    {payor && <p className="text-lg text-gray-600">{payor[0].display}</p>}
                    {type && <p className="text-lg capitalize text-gray-600">Category: {type.text}</p>}
                    {subscriberId && <p className="text-lg text-gray-600">Member ID: {subscriberId}</p>}
                    {status && <p className="text-lg text-gray-600">Status: {getCoverageStatus(status)}</p>}
                  </div>
                ),
              },
              {
                label: 'Online Bills',
                body: (
                  <div className="flex flex-col items-start">
                    <button onClick={handleViewPayments} className="text-lg text-sky-700">
                      View payments
                    </button>
                    <p className="inline-block text-lg text-gray-600">
                      Pay current bills, check your balance, and view previous payments.
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </InfoSection>
      ))}
    </>
  );
};

export default MembershipAndBilling;
