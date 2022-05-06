import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';

const ActionItems = lazy(() => import('./ActionItems'));

export const sideNavigation = {
  title: 'Care Plan',
  navigation: [{ name: 'Action Items', href: '/care-plan/action-items' }],
};

export default function CarePlan(): JSX.Element {
  return (
    <PageLayout sideNavigation={sideNavigation}>
      <Routes>
        <Route index element={<Navigate replace to={sideNavigation.navigation[0].href} />} />

        <Route path="action-items" element={<ActionItems />} />
      </Routes>
    </PageLayout>
  );
}
