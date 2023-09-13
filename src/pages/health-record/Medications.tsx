import { Box, Group, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import { formatDate, getReferenceString } from '@medplum/core';
import { BundleEntry, MedicationRequest, Patient } from '@medplum/fhirtypes';
import { useMedplum } from '@medplum/react';
import { IconChevronRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { InfoButton } from '../../components/InfoButton';
import { InfoSection } from '../../components/InfoSection';
import { useContext, useEffect, useState } from 'react';
import { SmarterFhirContext } from '../../App';

export function Medications(): JSX.Element {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const medplum = useMedplum();
  const patient = medplum.getProfile() as Patient;
  const medications = medplum.searchResources('MedicationRequest', 'patient=' + getReferenceString(patient)).read();
  const { client, setClient } = useContext(SmarterFhirContext);
  const [epicReports, setEpicReports] = useState<MedicationRequest[]>([]);

  useEffect(() => {
    if (client) {
      client.fhirClientDefault.request("MedicationRequest?subject=Patient/erXuFYUfucBZaryVksYEcMg3").then(bundle => {
        console.log(bundle);
        const newReports: MedicationRequest[] = bundle.entry?.map((v: BundleEntry<MedicationRequest>) => v.resource);
        setEpicReports(newReports.filter(v => v.resourceType === "MedicationRequest"));
      });
    }
  }, [client])

  return (
    <Box p="xl">
      <Title mb="lg">Medications</Title>
      <InfoSection title="Medications">
        <Stack spacing={0}>
          {medications.map((med) => (
            <InfoButton key={med.id} onClick={() => navigate(`./${med.id}`)}>
              <div>
                <Text c={theme.fn.primaryColor()} fw={500} mb={4}>
                  {med?.medicationCodeableConcept?.text}
                </Text>
                <Text c="gray.6">{med.requester?.display}</Text>
              </div>
              <IconChevronRight color={theme.colors.gray[5]} />
            </InfoButton>
          ))}
          {epicReports.map((med, idx) => (
            <InfoButton key={med.id ?? idx} onClick={() => navigate(`./${med.id}`)}>
              <div>
                <Text c={theme.fn.primaryColor()} fw={500} mb={4}>
                  {med?.medicationCodeableConcept?.text}
                </Text>
                <Text c="gray.6">{med.requester?.display}</Text>
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
