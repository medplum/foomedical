import { Fragment, useState } from 'react';
import { useMedplum } from '@medplum/react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Input from './Input';
import getMeasurementObject from '../helpers/get-measurement-object';
import { Patient, Reference } from '@medplum/fhirtypes';

interface MeasurementModalProps {
  subject: Reference<Patient>;
  type: string;
  isOpen: boolean;
  onClose: () => void;
}

interface MeasurementValues {
  diastolicBloodPressure: string;
  systolicBloodPressure: string;
  bodyTemperature: string;
  height: string;
  respiratoryRate: string;
  heartRate: string;
  weight: string;
}

interface measurementModalInputTypes {
  modalType: string;
  inputType: string;
  value: string;
  name: string;
  placeholder: string;
}

export default function MeasurementModal({ subject, type, isOpen, onClose }: MeasurementModalProps): JSX.Element {
  const medplum = useMedplum();

  const [modalValues, setModalValues] = useState<MeasurementValues>({
    diastolicBloodPressure: '',
    systolicBloodPressure: '',
    bodyTemperature: '',
    height: '',
    respiratoryRate: '',
    heartRate: '',
    weight: '',
  });

  const handleInputChange = (key: string, value: string): void => {
    setModalValues({ ...modalValues, [key]: value });
  };

  const createMeasurement = (firstValue: string, secondValue?: string): void => {
    medplum
      .createResource(getMeasurementObject(subject, type, firstValue, secondValue))
      .then(() => onClose())
      .catch((err) => console.error(err));
  };

  const addResource = (): void => {
    if (type === 'Blood Pressure' && modalValues.diastolicBloodPressure && modalValues.systolicBloodPressure) {
      createMeasurement(modalValues.diastolicBloodPressure, modalValues.systolicBloodPressure);
    } else if (type === 'Body Temperature' && modalValues.bodyTemperature) {
      createMeasurement(modalValues.bodyTemperature);
    } else if (type === 'Height' && modalValues.height) {
      createMeasurement(modalValues.height);
    } else if (type === 'Respiratory Rate' && modalValues.respiratoryRate) {
      createMeasurement(modalValues.respiratoryRate);
    } else if (type === 'Heart Rate' && modalValues.heartRate) {
      createMeasurement(modalValues.heartRate);
    } else if (type === 'Weight' && modalValues.weight) {
      createMeasurement(modalValues.weight);
    }
  };

  const measurementModalInputs: measurementModalInputTypes[] = [
    {
      modalType: 'Blood Pressure',
      inputType: 'number',
      value: modalValues.systolicBloodPressure,
      name: 'systolicBloodPressure',
      placeholder: 'mm[Hg]',
    },
    {
      modalType: 'Blood Pressure',
      inputType: 'number',
      value: modalValues.diastolicBloodPressure,
      name: 'diastolicBloodPressure',
      placeholder: 'mm[Hg]',
    },
    {
      modalType: 'Body Temperature',
      inputType: 'number',
      value: modalValues.bodyTemperature,
      name: 'bodyTemperature',
      placeholder: '°C',
    },
    {
      modalType: 'Height',
      inputType: 'number',
      value: modalValues.height,
      name: 'height',
      placeholder: 'cm',
    },
    {
      modalType: 'Respiratory Rate',
      inputType: 'number',
      value: modalValues.respiratoryRate,
      name: 'respiratoryRate',
      placeholder: '/min',
    },
    {
      modalType: 'Heart Rate',
      inputType: 'number',
      value: modalValues.heartRate,
      name: 'heartRate',
      placeholder: '/min',
    },
    {
      modalType: 'Weight',
      inputType: 'number',
      value: modalValues.weight,
      name: 'weight',
      placeholder: 'kg',
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
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {type}
                  </Dialog.Title>
                  <div className="mt-2 flex space-x-4">
                    {measurementModalInputs
                      .filter(({ modalType }) => modalType === type)
                      .map(({ inputType, name, value, placeholder }) => (
                        <div className="flex w-full flex-col space-y-2" key={name}>
                          <p className="text-base capitalize text-gray-600">{name.split(/(?=[A-Z])/).join(' ')}</p>
                          <Input
                            type={inputType}
                            value={value}
                            name={name}
                            handleChange={handleInputChange}
                            placeholder={placeholder}
                          />
                        </div>
                      ))}
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
