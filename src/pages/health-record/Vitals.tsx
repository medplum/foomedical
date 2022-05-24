// This example requires Tailwind CSS v2.0+
// https://tailwindui.com/components/application-ui/headings/card-headings
// https://tailwindui.com/components/application-ui/lists/stacked-lists
import { Bundle, Observation } from '@medplum/fhirtypes';
import { useMedplum } from '@medplum/ui';
import { useEffect, useState } from 'react';
import GridCell from '../../components/GridCell';
import GridSection from '../../components/GridSection';
import NoData from '../../components/NoData';
import PageTitle from '../../components/PageTitle';
import getLocaleDate from '../../helpers/get-locale-date';
import renderValue from '../../helpers/get-render-value';

export default function Vitals(): JSX.Element {
  const medplum = useMedplum();
  const [bundle, setBundle] = useState<Bundle<Observation>>();
  const data = bundle?.entry;
  const hasData = !!data?.length;

  useEffect(() => {
    medplum
      .search('Observation?_sort=-date&patient=Patient/3e27eaee-2c55-4400-926e-90982df528e9')
      .then((value) => setBundle(value as Bundle<Observation>))
      .catch((err) => console.error(err));
  }, []);
  const array = ['Measurements', 'Your Value', 'Last updated'];
  return (
    <div className="rounded-lg bg-white px-4 py-5 sm:px-6">
      <PageTitle title="Vitals" />
      <GridSection array={array}>
        {hasData ? (
          <ul role="list" className="divide-y divide-gray-200 border-b-2  border-solid border-gray-200">
            {data.map(({ resource }) => (
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
    </div>
  );
}
