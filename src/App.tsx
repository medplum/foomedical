import { Suspense } from 'react';
import { useMedplum } from '@medplum/react';
import Loader from './components/Loader';
import Router from './Router';

export function App(): JSX.Element | null {
  const medplum = useMedplum();

  if (medplum.isLoading()) {
    return null;
  }

  const profile = medplum.getProfile();

  return <Router profile={profile} />;
}
