import { getReferenceString } from '@medplum/core';
import { Patient } from '@medplum/fhirtypes';
import { Document, Scheduler, useMedplum } from '@medplum/react';
import './GetCare.css';

export default function GetCare(): JSX.Element {
  const medplum = useMedplum();
  const patient = medplum.getProfile() as Patient;
  const scheduleBundle = medplum.search('Schedule', 'actor=' + getReferenceString(patient)).read();

  return (
    <>
      {scheduleBundle.entry && scheduleBundle.entry[0].resource && (
        <div className="flex w-full justify-center py-2 sm:py-5">
          <Document>
            <Scheduler schedule={scheduleBundle.entry[0].resource} />
          </Document>
        </div>
      )}
    </>
  );
}
