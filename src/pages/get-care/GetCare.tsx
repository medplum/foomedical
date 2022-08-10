import { Document, Scheduler, useMedplum } from '@medplum/react';
import { getReferenceString, ProfileResource } from '@medplum/core';
import NoData from '../../components/NoData';
import './GetCare.css';

export default function GetCare(): JSX.Element {
  const medplum = useMedplum();
  const profile = medplum.getProfile() as ProfileResource;

  const scheduleBundle = medplum.search('Schedule').read();

  return (
    <>
      {scheduleBundle.entry && scheduleBundle.entry.length > 0 ? (
        <div className="flex w-full justify-center py-2 sm:py-5">
          <Document>
            {scheduleBundle.entry[0].resource && <Scheduler schedule={scheduleBundle.entry[0].resource} />}
          </Document>
        </div>
      ) : (
        <NoData title="schedule" />
      )}
    </>
  );
}
