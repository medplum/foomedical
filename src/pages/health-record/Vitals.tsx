import { useMedplum } from '@medplum/react';
import GridCell from '../../components/GridCell';
import GridSection from '../../components/GridSection';
import NoData from '../../components/NoData';
import PageTitle from '../../components/PageTitle';
import getLocaleDate from '../../helpers/get-locale-date';
import renderValue from '../../helpers/get-render-value';

const headers = ['Measurements', 'Your Value', 'Last updated'];

export default function Vitals(): JSX.Element {
  const medplum = useMedplum();

  const bundle = medplum
    .search('Observation', '_sort=-date&patient=Patient/3e27eaee-2c55-4400-926e-90982df528e9')
    .read();

  return (
    <>
      <PageTitle title="Vitals" />
      <GridSection array={headers}>
        {bundle.entry ? (
          <ul role="list" className="divide-y divide-gray-200 border-b-2  border-solid border-gray-200">
            {bundle.entry.map(({ resource }) => (
              <li key={resource?.meta?.lastUpdated}>
                {resource && resource?.code?.coding && resource?.meta?.lastUpdated && (
                  <a href="#" className="block hover:bg-gray-50">
                    <div className="flex items-center py-4">
                      <div className="flex min-w-0 flex-1 items-center">
                        <div className="grid min-w-0 flex-1 grid-cols-3">
                          <GridCell item={resource?.code?.coding[0].display} color="teal" />
                          <GridCell item={renderValue(resource)} color="gray" />
                          <GridCell item={getLocaleDate(resource?.meta?.lastUpdated)} color="gray" />
                        </div>
                      </div>
                    </div>
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <NoData title="results" />
        )}
      </GridSection>
    </>
  );
}
