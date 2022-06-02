import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMedplum, ResourceTable } from '@medplum/react';
import { Observation } from '@medplum/fhirtypes';
import LinkToPreviousPage from '../../../components/LinkToPreviousPage';
import InfoSection from '../../../components/InfoSection';
import NoData from '../../../components/NoData';
import './ObservationResult.css';

export default function ObservationResult(): JSX.Element {
  const medplum = useMedplum();
  const { observationId = '' } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState<Observation>();

  useEffect(() => {
    medplum
      .readResource('Observation', observationId)
      .then((value) => setResource(value as Observation))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {resource ? (
        <>
          <LinkToPreviousPage onClick={() => navigate(-1)} label="Go back" />
          <InfoSection title="Observation result">
            <ResourceTable value={resource} ignoreMissingValues />
          </InfoSection>
        </>
      ) : (
        <NoData title="Observation" />
      )}
    </>
  );
}
