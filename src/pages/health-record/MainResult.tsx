import { DiagnosticReport } from '@medplum/fhirtypes';
import { DiagnosticReportDisplay, useMedplum } from '@medplum/react';
import { useParams } from 'react-router-dom';
import NoData from '../../components/NoData';
import './MainResult.css';

export default function MainResult(): JSX.Element {
  const medplum = useMedplum();
  const { resultId = '' } = useParams();

  const resource: DiagnosticReport = medplum.readResource('DiagnosticReport', resultId).read();

  return <>{resource ? <DiagnosticReportDisplay value={resource} /> : <NoData title="results" />}</>;
}
