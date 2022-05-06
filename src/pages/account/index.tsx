import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';

const Profile = lazy(() => import('./Profile'));
const Provider = lazy(() => import('./Provider'));

export const sideNavigation = {
  title: 'Account',
  navigation: [
    { name: 'Profile', href: '/account/profile' },
    { name: 'Provider', href: '/account/provider' },
  ],
};

export default function Account(): JSX.Element {
  return (
    <PageLayout sideNavigation={sideNavigation}>
      <Routes>
        <Route index element={<Navigate replace to={sideNavigation.navigation[0].href} />} />

        <Route path="profile" element={<Profile />} />
        <Route path="provider" element={<Provider />} />
      </Routes>
    </PageLayout>
  );
}
