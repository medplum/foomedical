import { Observation } from '@medplum/fhirtypes';
import { ResourceTable, useMedplum } from '@medplum/react';
import { useNavigate, useParams } from 'react-router-dom';
import InfoSection from '../../components/InfoSection';
import LinkToPreviousPage from '../../components/LinkToPreviousPage';
import NoData from '../../components/NoData';
import './ObservationResult.css';

export default function ObservationResult(): JSX.Element {
  const medplum = useMedplum();
  const { observationId = '' } = useParams();
  const navigate = useNavigate();

  const resource: Observation = medplum.readResource('Observation', observationId).read();

  return (
    <>
      {resource ? (
        <>
          <LinkToPreviousPage onClick={() => navigate(-1)} label="Go back" />
          <div className="mt-5 sm:mt-10">
            <InfoSection title={resource?.code?.text || 'Results'}>
              <ResourceTable value={resource} ignoreMissingValues />
            </InfoSection>
          </div>
        </>
      ) : (
        <NoData title="Results" />
      )}
    </>
  );
}
