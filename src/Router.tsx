import { Navigate, Route, Routes } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import Messages from './pages/messages';
import { SignInPage } from './pages/SignInPage';
import { SignOutPage } from './pages/SignOutPage';
import { ProfileResource } from '@medplum/core';
import { profileContext } from './profileContext';
import Account from './pages/account';
import HealthRecord from './pages/health-record';
import Observation from './pages/observation';
import CarePlan from './pages/care-plan';
import { RegisterPage } from './pages/RegisterPage';

export interface RouterProps {
  profile: ProfileResource | undefined;
}

export default function Router({ profile }: RouterProps): JSX.Element {
  return profile ? (
    <profileContext.Provider value={profile}>
      <Routes>
        <Route path="/" element={<Navigate replace to="/health-record/lab-results" />} />
        <Route path="messages/*" element={<Messages />} />
        <Route path="health-record/*" element={<HealthRecord />} />
        <Route path="Observation/*" element={<Observation />} />
        <Route path="care-plan/*" element={<CarePlan />} />
        <Route path="account/*" element={<Account />} />
        <Route path="signout" element={<SignOutPage />} />
      </Routes>
    </profileContext.Provider>
  ) : (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="signin" element={<SignInPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}
