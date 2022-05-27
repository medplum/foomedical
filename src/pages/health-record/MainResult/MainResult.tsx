import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMedplum, DiagnosticReportDisplay } from '@medplum/ui';
import { DiagnosticReport } from '@medplum/fhirtypes';
import NoData from '../../../components/NoData';
import './MainResult.css';

export default function MainResult(): JSX.Element {
  const medplum = useMedplum();
  const { resultId = '' } = useParams();
  const [resource, setResource] = useState<DiagnosticReport>();

  useEffect(() => {
    medplum
      .readResource('DiagnosticReport', resultId)
      .then((value) => setResource(value as DiagnosticReport))
      .catch((err) => console.error(err));
  }, []);

  return <>{resource ? <DiagnosticReportDisplay value={resource} /> : <NoData title="results" />}</>;
}
