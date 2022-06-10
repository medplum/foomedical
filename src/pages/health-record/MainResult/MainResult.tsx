import { useParams } from 'react-router-dom';
import { useMedplum, DiagnosticReportDisplay } from '@medplum/react';
import { DiagnosticReport } from '@medplum/fhirtypes';
import NoData from '../../../components/NoData';
import './MainResult.css';

export default function MainResult(): JSX.Element {
  const medplum = useMedplum();
  const { resultId = '' } = useParams();

  const resource: DiagnosticReport = medplum.readResource<DiagnosticReport>('DiagnosticReport', resultId).read();

  return <>{resource ? <DiagnosticReportDisplay value={resource} /> : <NoData title="results" />}</>;
}
