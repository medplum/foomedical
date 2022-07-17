import { Scheduler } from '../../../components/Scheduler';
import { Document, useMedplum } from '@medplum/react';
import './GetCare.css';

export default function GetCare(): JSX.Element {
  const medplum = useMedplum();

  const scheduleBundle = medplum.search('Schedule', 'actor=Patient/4b916f75-38da-42a1-9591-981cfae9098c').read();

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
