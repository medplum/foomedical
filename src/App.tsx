import { useMedplum } from '@medplum/react';
import Router from './Router';

export function App(): JSX.Element | null {
  const medplum = useMedplum();

  if (medplum.isLoading()) {
    return null;
  }

  const profile = medplum.getProfile();

  return <Router profile={profile} />;
}
