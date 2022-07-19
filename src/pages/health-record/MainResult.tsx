import { DiagnosticReport } from '@medplum/fhirtypes';
import { DiagnosticReportDisplay, useMedplum } from '@medplum/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NoData from '../../components/NoData';

export default function MainResult(): JSX.Element {
  const medplum = useMedplum();
  const { resultId = '' } = useParams();
  const [resource, setResource] = useState<DiagnosticReport>();

  useEffect(() => {
    medplum
      .readResource('DiagnosticReport', resultId)
      .then((value) => setResource(value as DiagnosticReport))
      .catch((err) => console.error(err));
  }, [medplum, resultId]);

  return <>{resource ? <DiagnosticReportDisplay value={resource} /> : <NoData title="results" />}</>;
}
