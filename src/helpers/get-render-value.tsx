import { Observation } from '@medplum/fhirtypes';

const renderValue = (resource: Observation): JSX.Element => {
  if (resource?.component?.length) {
    return (
      <>
        <p>
          {resource.component[1].valueQuantity?.value}
          &nbsp;/&nbsp;
          {resource.component[0].valueQuantity?.value}&nbsp;
          {resource.component[0].valueQuantity?.unit?.replace(/\[|\]/g, '')}
        </p>
      </>
    );
  } else if (resource?.valueQuantity?.value) {
    return (
      <>
        <p>
          {resource?.valueQuantity?.value}&nbsp;
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
