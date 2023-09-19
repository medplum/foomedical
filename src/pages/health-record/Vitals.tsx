import { Table, Title, Text } from '@mantine/core';
import { formatDate, formatObservationValue, getReferenceString } from '@medplum/core';
import { BundleEntry, Observation, Patient } from '@medplum/fhirtypes';
import { Document, useMedplum } from '@medplum/react';
import { useContext, useEffect, useState } from 'react';
import { SmarterFhirContext } from '../../App';
import { EpicTag } from '../Integrations';

export function Vitals(): JSX.Element {
  const medplum = useMedplum();
  const patient = medplum.getProfile() as Patient;
  const observations = medplum.searchResources('Observation', 'patient=' + getReferenceString(patient)).read();
  const { client, setClient } = useContext(SmarterFhirContext);
  const [epicObservations, setEpicObservations] = useState<Observation[]>([]);

  useEffect(() => {
    if (client) {
      client.fhirClientDefault.request(`Observation?subject=Patient/${client.fhirClientDefault.getPatientId()}&category=vital-signs&date=ge2021-02-01`).then(bundle => {
        const newObs: Observation[] = bundle.entry?.map((v: BundleEntry<Observation>) => v.resource);
        setEpicObservations(newObs.filter(v => v.resourceType === "Observation"));
      });
    }
  }, [client])

  return (
    <Document>
      <Title>Vitals</Title>
      <Table>
        <thead>
          <tr>
            <th>Measurement</th>
            <th>Your Value</th>
            <th>Last Updated</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {observations.map((obs) => (
            <tr key={obs.id}>
              <td>{obs.code?.coding?.[0]?.display}</td>
              <td>{formatObservationValue(obs)}</td>
              <td>{formatDate(obs.meta?.lastUpdated)}</td>
              <td></td>
            </tr>
          ))}
          {epicObservations.map((obs) => (
            <tr key={obs.id}>
              <td>{obs.code?.coding?.[0]?.display}</td>
              <td>{formatObservationValue(obs)}</td>
              <td>{formatDate(obs.meta?.lastUpdated ?? obs.effectiveDateTime)}</td>
              <td><EpicTag /></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Document>
  );
}
