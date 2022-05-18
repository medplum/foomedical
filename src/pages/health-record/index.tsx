import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import { measurementsMeta } from './Measurement';

const LabResults = lazy(() => import('./LabResults'));
const Medications = lazy(() => import('./Medications'));
const Vaccines = lazy(() => import('./Vaccines'));
const Vitals = lazy(() => import('./Vitals'));
const Measurement = lazy(() => import('./Measurement'));

export const sideMenu = {
  title: 'Health Record',
  menu: [
    { name: 'Lab Results', href: '/health-record/lab-results' },
    { name: 'Vaccines', href: '/health-record/vaccines' },
    {
      name: 'Vitals',
      href: '/health-record/vitals',
      subMenu: Object.values(measurementsMeta).map(({ title, id }) => ({
        name: title,
        href: `/health-record/vitals/${id}`,
      })),
    },
  ],
};

export default function HealthRecord(): JSX.Element {
  return (
    <PageLayout sideMenu={sideMenu}>
      <Routes>
        <Route index element={<Navigate replace to={sideMenu.menu[0].href} />} />
        <Route path="lab-results" element={<LabResults />} />
        <Route path="medications" element={<Medications />} />
        <Route path="vaccines" element={<Vaccines />} />
        <Route path="vitals" element={<Vitals />} />
        <Route path="vitals/:measurementId" element={<Measurement />} />
      </Routes>
    </PageLayout>
  );
}