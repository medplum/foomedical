import { Box, Group, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import { formatDate, getReferenceString } from '@medplum/core';
import { BundleEntry, DiagnosticReport, Patient } from '@medplum/fhirtypes';
import { useMedplum } from '@medplum/react';
import { IconChevronRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { InfoButton } from '../../components/InfoButton';
import { InfoSection } from '../../components/InfoSection';
import { useContext, useEffect, useState } from 'react';
import { SmarterFhirContext } from '../../App';

export function LabResults(): JSX.Element {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const medplum = useMedplum();
  const patient = medplum.getProfile() as Patient;
  const reports = medplum.searchResources('DiagnosticReport', 'subject=' + getReferenceString(patient)).read();
  const { client, setClient } = useContext(SmarterFhirContext);
  const [epicReports, setEpicReports] = useState<DiagnosticReport[]>([]);

  useEffect(() => {
    if (client) {
      client.fhirClientDefault.request("DiagnosticReport?subject=Patient/erXuFYUfucBZaryVksYEcMg3").then(bundle => {
        const newReports: DiagnosticReport[] = bundle.entry?.map((v: BundleEntry<DiagnosticReport>) => v.resource);
        setEpicReports(newReports.filter(v => v.resourceType === "DiagnosticReport"));
      });
    }
  }, [client])

  return (
    <Box p="xl">
      <Title mb="lg">Lab Results</Title>
      <InfoSection title="Lab Results">
        <Stack spacing={0}>
          {reports.map((report) => (
            <InfoButton key={report.id} onClick={() => navigate(`./${report.id}`)}>
              <div>
                <Text fw={500} mb={4}>
                  {formatDate(report.meta?.lastUpdated as string)}
                </Text>
                <Text>{report.code?.text}</Text>
              </div>
              <IconChevronRight color={theme.colors.gray[5]} />
            </InfoButton>
          ))}
          {epicReports.map((report, idx) => (
            <InfoButton key={report.id ?? idx} onClick={() => navigate(`./${report.id}`)}>
              <div>
                <Text fw={500} mb={4}>
                  {formatDate(report.effectiveDateTime as string)}
                </Text>
                <Text>{report.code?.text}</Text>
              </div>
              <Group>
                <Text style={{ backgroundColor: "#db5a33", color: "white", borderRadius: "0.25rem", paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.25rem", paddingBottom: "0.25rem", fontWeight: "bold" }}>Epic</Text>
                <IconChevronRight color={theme.colors.gray[5]} />
              </Group>
            </InfoButton>
          ))}
        </Stack>
      </InfoSection>
    </Box>
  );
}
