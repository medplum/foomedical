import { useMedplum } from '@medplum/ui';
import { useEffect } from 'react';

export function SignOutPage() {
  const medplum = useMedplum();

  useEffect(() => {
    medplum.signOut().then(() => (window.location.href = '/'));
  }, []);

  return null;
}
