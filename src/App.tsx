import { Suspense } from 'react';
import { useMedplum } from '@medplum/ui';
import Loader from './components/Loader';
import Router from './Router';

export function App(): JSX.Element | null {
  const medplum = useMedplum();

  if (medplum.isLoading()) {
    return null;
  }

  const profile = medplum.getProfile();

  return (
    <Suspense fallback={<Loader />}>
      <Router profile={profile} />
    </Suspense>
  );
}
