import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';

const LabResults = lazy(() => import('./LabResults'));
const Medications = lazy(() => import('./Medications'));
const Vaccines = lazy(() => import('./Vaccines'));

export const sideNavigation = {
  title: 'Health Record',
  navigation: [
    { name: 'Lab Results', href: '/health-record/lab-results' },
    { name: 'Vaccines', href: '/health-record/vaccines' },
  ],
};

export default function HealthRecord(): JSX.Element {
  return (
    <PageLayout sideNavigation={sideNavigation}>
      <Routes>
        <Route index element={<Navigate replace to={sideNavigation.navigation[0].href} />} />

        <Route path="lab-results" element={<LabResults />} />
        <Route path="medications" element={<Medications />} />
        <Route path="vaccines" element={<Vaccines />} />
      </Routes>
    </PageLayout>
  );
}
