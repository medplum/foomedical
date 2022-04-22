import { useMedplum } from '@medplum/ui';
import { Route, Routes } from 'react-router-dom';
import ActionItemsList from './components/ActionItemsList';
import ImmunizationList from './components/ImmunizationList';
import LabResultsList from './components/LabResultsList';
import MedicationList from './components/MedicationList';
import { CarePlanPage } from './pages/CarePlanPage';
import { HealthRecordPage } from './pages/HealthRecordPage';
import { LandingPage } from './pages/LandingPage';
import MessagesPage from './pages/MessagesPage';
import { SignInPage } from './pages/SignInPage';

export function App(): JSX.Element | null {
  const medplum = useMedplum();

  if (medplum.isLoading()) {
    return null;
  }

  const profile = medplum.getProfile();

  if (!profile) {
    return (
      <>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="signin" element={<SignInPage />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HealthRecordPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="health-record/*" element={<HealthRecordPage />}>
          <Route index element={<LabResultsList />} />
          <Route path="lab-results" element={<LabResultsList />} />
          <Route path="immunizations" element={<ImmunizationList />} />
          <Route path="medications" element={<MedicationList />} />
        </Route>
        <Route path="care-plan/*" element={<CarePlanPage />}>
          <Route index element={<ActionItemsList />} />
          <Route path="action-items" element={<ActionItemsList />} />
        </Route>
      </Routes>
    </>
  );
}
