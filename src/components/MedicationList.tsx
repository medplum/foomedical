// This example requires Tailwind CSS v2.0+
// https://tailwindui.com/components/application-ui/lists/stacked-lists
import { CalendarIcon, LocationMarkerIcon } from '@heroicons/react/solid';
import { MedicationRequest } from '@medplum/fhirtypes';
import { DateTimeDisplay, useMedplum } from '@medplum/ui';
import { useEffect, useState } from 'react';

export default function MedicationList() {
  const medplum = useMedplum();
  const [medications, setMedications] = useState<MedicationRequest[]>();

  useEffect(() => {
    medplum
      .searchResources<MedicationRequest>(
        'MedicationRequest?subject=Patient/0beab6fe-fc9c-4276-af71-4df508097eb2&_sort=-_lastUpdated'
      )
      .then(setMedications);
  }, []);

  return (
    <div className="bg-white px-4 py-5 sm:rounded-lg sm:px-6">
      <h2 className="text-lg font-medium text-gray-900 mb-3">Medications</h2>
      <div className="bg-white border overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {!medications && <div>Loading...</div>}
          {medications?.map((med) => (
            <li key={med.id}>
              <a href="#" className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-teal-600 truncate">{med.medicationCodeableConcept?.text}</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {med.status}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        {med.requester?.display}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                      <p>
                        <DateTimeDisplay value={med.authoredOn} />
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
