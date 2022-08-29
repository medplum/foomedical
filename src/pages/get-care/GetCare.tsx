import { Document, Scheduler, useMedplum } from '@medplum/react';
import NoData from '../../components/NoData';
import './GetCare.css';

export default function GetCare(): JSX.Element {
  const medplum = useMedplum();

  const scheduleBundle = medplum.search('Schedule').read();

  return (
    <>
      {scheduleBundle.entry && scheduleBundle.entry.length > 0 ? (
        <div className="flex w-full justify-center py-2 sm:py-5">
          <Document>
            {scheduleBundle.entry[0].resource && (
              <Scheduler
                schedule={scheduleBundle.entry[0].resource}
                questionnaire={{
                  resourceType: 'Questionnaire',
                  name: 'Test',
                  item: [
                    {
                      id: 'id-1',
                      linkId: 'q1',
                      type: 'string',
                      text: 'Question 1',
                    },
                    {
                      id: 'id-2',
                      linkId: 'q2',
                      type: 'string',
                      text: 'Question 2',
                    },
                    {
                      id: 'id-3',
                      linkId: 'q3',
                      type: 'string',
                      text: 'Question 3',
                    },
                  ],
                }}
              />
            )}
          </Document>
        </div>
      ) : (
        <NoData title="schedule" />
      )}
    </>
  );
}
