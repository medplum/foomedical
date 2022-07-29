import { Observation } from '@medplum/fhirtypes';

const renderValue = (resource: Observation): JSX.Element => {
  if (resource?.component?.length) {
    return (
      <>
        <p>
          {resource.component[1].valueQuantity?.value?.toFixed(1)}
          &nbsp;/&nbsp;
          {resource.component[0].valueQuantity?.value?.toFixed(1)}&nbsp;
          {resource.component[0].valueQuantity?.unit?.replace(/\[|\]/g, '')}
        </p>
      </>
    );
  } else if (resource?.valueQuantity?.value) {
    return (
      <>
        <p>
          {resource?.valueQuantity?.value?.toFixed(1)}&nbsp;
          {resource?.valueQuantity?.unit?.replace('/', '/ ')}
        </p>
      </>
    );
  } else {
    return (
      <>
        <p>{resource?.valueCodeableConcept?.text}</p>
      </>
    );
  }
};

export default renderValue;
