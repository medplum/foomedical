import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';

const Profile = lazy(() => import('./Profile'));
const Provider = lazy(() => import('./Provider'));
const MembershipAndBilling = lazy(() => import('./MembershipAndBilling'));
const ChooseProvider = lazy(() => import('./ChooseProvider'));

export const sideMenu = {
  title: 'Account',
  menu: [
    { name: 'Profile', href: '/account/profile' },
    { name: 'Provider', href: '/account/provider' },
    { name: 'Membership & Billing', href: '/account/membership-and-billing' },
  ],
};

export default function Account(): JSX.Element {
  return (
    <PageLayout sideMenu={sideMenu}>
      <Routes>
        <Route index element={<Navigate replace to={sideMenu.menu[0].href} />} />
        <Route path="profile" element={<Profile />} />
        <Route path="provider/*" element={<Provider />} />
        <Route path="provider/choose-a-primary-care-povider" element={<ChooseProvider />} />
        <Route path="membership-and-billing" element={<MembershipAndBilling />} />
      </Routes>
    </PageLayout>
  );
}
