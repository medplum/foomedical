import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';

const LabResults = lazy(() => import('./LabResults'));
const Medications = lazy(() => import('./Medications'));
const Vaccines = lazy(() => import('./Vaccines'));
const Vitals = lazy(() => import('./Vitals'));

export const sideMenu = {
  title: 'Health Record',
  menu: [
    { name: 'Lab Results', href: '/health-record/lab-results' },
    { name: 'Vaccines', href: '/health-record/vaccines' },
    { name: 'Vitals', href: '/health-record/vitals' },
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
      </Routes>
    </PageLayout>
  );
}
