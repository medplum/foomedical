import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import { sideMenu } from '../health-record';

const ObservationResult = lazy(() => import('./ObservationResult'));

export default function Observation(): JSX.Element {
  return (
    <PageLayout sideMenu={sideMenu}>
      <Routes>
        <Route index element={<Navigate replace to={sideMenu.menu[0].href} />} />
        <Route path="/:observationId" element={<ObservationResult />} />
      </Routes>
    </PageLayout>
  );
}
