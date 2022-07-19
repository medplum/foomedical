import { useMedplumProfile } from '@medplum/react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import Account from './pages/account';
import CarePlan from './pages/care-plan';
import GetCare from './pages/get-care';
import HealthRecord from './pages/health-record';
import { LandingPage } from './pages/LandingPage';
import Messages from './pages/messages';
import Observation from './pages/observation';
import { RegisterPage } from './pages/RegisterPage';
import { SignInPage } from './pages/SignInPage';
import { SignOutPage } from './pages/SignOutPage';

export default function Router(): JSX.Element {
  const profile = useMedplumProfile();
  return profile ? (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="messages/*" element={<Messages />} />
      <Route path="health-record/*" element={<HealthRecord />} />
      <Route path="Observation/*" element={<Observation />} />
      <Route path="care-plan/*" element={<CarePlan />} />
      <Route path="get-care/*" element={<GetCare />} />
      <Route path="account/*" element={<Account />} />
      <Route path="signout" element={<SignOutPage />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="signin" element={<SignInPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}
