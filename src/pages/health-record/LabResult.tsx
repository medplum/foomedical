import { Box } from '@mantine/core';
import { DiagnosticReport } from '@medplum/fhirtypes';
import { DiagnosticReportDisplay, useMedplum } from '@medplum/react';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SmarterFhirContext } from '../../App';

export function LabResult({ epic }: { epic?: boolean }): JSX.Element {
  const medplum = useMedplum();
  const { resultId = '' } = useParams();
  const [resource, setResource] = useState<DiagnosticReport>();
  const { client, setClient } = useContext(SmarterFhirContext);

  useEffect(() => {
    if (epic && client) {
      client.fhirClientDefault.request(`DiagnosticReport/${resultId}`).then(v => setResource(v))
    }
    else {
      setResource(medplum.readResource('DiagnosticReport', resultId).read());
    }
  }, []);

  return (
    <Box p="xl">
      <DiagnosticReportDisplay value={resource} />
    </Box>
  );
}
