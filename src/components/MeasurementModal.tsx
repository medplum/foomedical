import { Fragment, useState } from 'react';
import { useMedplum } from '@medplum/react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import Input from './Input';
import { Observation } from '@medplum/fhirtypes';

interface MeasurementModalProps {
  profile: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSend: (value: Observation) => void;
}

interface MeasurementValues {
  diastolicBloodPressure: number;
  systolicBloodPressure: number;
}

export default function MeasurementModal({
  profile,
  isOpen,
  onClose,
  title,
  onSend,
}: MeasurementModalProps): JSX.Element {
  const medplum = useMedplum();
  const date = new Date().toISOString();

  const [modalValues, setModalValues] = useState<MeasurementValues>({
    diastolicBloodPressure: 0,
    systolicBloodPressure: 0,
  });

  const handleInputChange = (key: string, value: string): void => {
    setModalValues({ ...modalValues, [key]: value });
  };

  const addResource = (): void => {
    if (modalValues.diastolicBloodPressure && modalValues.systolicBloodPressure) {
      medplum
        .createResource({
          resourceType: 'Observation',
          subject: {
            reference: profile,
          },
          code: {
            coding: [
              {
                code: '85354-9',
                display: 'Blood Pressure',
                system: 'http://loinc.org',
              },
            ],
            text: 'Blood Pressure',
          },
          component: [
            {
              code: {
                coding: [
                  {
                    code: '8462-4',
                    display: 'Diastolic Blood Pressure',
                    system: 'http://loinc.org',
                  },
                ],
                text: 'Diastolic Blood Pressure',
              },
              valueQuantity: {
                code: 'mm[Hg]',
                system: 'http://unitsofmeasure.org',
                unit: 'mm[Hg]',
                value: modalValues.diastolicBloodPressure,
              },
            },
            {
              code: {
                coding: [
                  {
                    code: '8480-6',
                    display: 'Systolic Blood Pressure',
                    system: 'http://loinc.org',
                  },
                ],
                text: 'Systolic Blood Pressure',
              },
              valueQuantity: {
                code: 'mm[Hg]',
                system: 'http://unitsofmeasure.org',
                unit: 'mm[Hg]',
                value: modalValues.systolicBloodPressure,
              },
            },
          ],
          effectiveDateTime: date,
          status: 'final',
        })
        .then((value) => onSend(value))
        .then(() => onClose())
        .catch((err) => console.error(err));
    }
  };

  const measurementModalInputs = [
    {
      type: 'number',
      value: modalValues.systolicBloodPressure,
      name: 'systolicBloodPressure',
      placeholder: 'Systolic Blood Pressure',
    },
    {
      type: 'number',
      value: modalValues.diastolicBloodPressure,
      name: 'diastolicBloodPressure',
      placeholder: 'Diastolic Blood Pressure',
    },
  ];

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {title}
                  </Dialog.Title>
                  <div className="mt-2 flex space-x-4">
                    {measurementModalInputs.map(({ type, name, value, placeholder }) => {
                      return (
                        <div className="flex w-full flex-col space-y-2" key={name}>
                          <p className="text-base text-gray-600">{placeholder}</p>
                          <Input
                            type={type}
                            value={value}
                            name={name}
                            handleChange={handleInputChange}
                            placeholder={placeholder}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={addResource}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
