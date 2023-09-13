import { ClientFactory } from "@TopologyHealth/smarterfhir";
import { LAUNCH } from "@TopologyHealth/smarterfhir/lib/Client/ClientFactory";
import { useContext, useEffect, useRef } from "react";
import { SmarterFhirContext } from "../App";
import { Group, Stack, Title, Divider, Text, Box, Container, Button } from "@mantine/core";
import { ResourceAvatar, ResourceName, Document } from "@medplum/react";

async function startStandaloneLaunch() {
  console.log("Launched");
  try {
    const emrClientID = "86e74d43-2046-492e-b460-73c31fa7289d"
    const redirect = "http://localhost:3000/integrations";
    const standaloneUrl = `https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize?response_type=code&redirect_uri=${redirect}&client_id=${emrClientID}&state=TESTSTATE&aud=https%3A%2F%2Ffhir.epic.com%2Finterconnect-fhir-oauth%2Fapi%2Ffhir%2FR4`
    window.location.href = standaloneUrl;
  }
  catch (e) {
    if (e instanceof Error) {
      throw e;
    }
  }
}

export const Integrations = () => {
  const authCheckedRef = useRef(false);
  const { client, setClient } = useContext(SmarterFhirContext);

  useEffect(() => {
    if (authCheckedRef.current) return;
    authCheckedRef.current = true;
    console.log("Running mount effect");
    let cancelled = false;

    try {
      const clientFactory = new ClientFactory();
      clientFactory.createEMRClient(LAUNCH.STANDALONE, "http://localhost:3000/integrations").then(client => {
        setClient(client);
        console.log("Successfully authenticated with Epic");
      })
    }
    catch {}

    return () => { cancelled = true; }
  }, []);
  
  return <div>
    <Document width={800}>
      <Title>Integrations</Title>
      <Divider my="xl" />
      <Stack spacing="xl">
        <Group align="top">
          <Text size="sm" weight={500} m="sm">
            Epic
          </Text>
          <Button compact my="sm" onClick={() => client !== null ? setClient(null) : startStandaloneLaunch()}>
            {client !== null ? "Disconnect" : "Connect"}
          </Button>
        </Group>
      </Stack>
    </Document>
  </div>
}