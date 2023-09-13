import { AppShell } from '@mantine/core';
import { ErrorBoundary, useMedplum } from '@medplum/react';
import { Suspense, createContext, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Loading } from './components/Loading';
import { LandingPage } from './pages/landing';
import { RegisterPage } from './pages/RegisterPage';
import { SignInPage } from './pages/SignInPage';
import { Router } from './Router';
import { BaseClient } from '@TopologyHealth/smarterfhir';

export const SmarterFhirContext = createContext<{ client: BaseClient | null, setClient: (newClient: BaseClient | null) => void }>({ client: null, setClient: () => void(0) });

export function App(): JSX.Element | null {
  const location = useLocation();
  const medplum = useMedplum();
  const [client, setClient] = useState<BaseClient | null>(null);

  if (medplum.isLoading()) {
    return null;
  }

  if (!medplum.getProfile()) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="signin" element={<RegisterPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  }

  return (
    <SmarterFhirContext.Provider value={{ client, setClient }}>
      <AppShell padding={0} fixed={true} header={<Header />} footer={<Footer />}>
        <ErrorBoundary key={location.pathname}>
            <Suspense fallback={<Loading />}>
              <Router />
            </Suspense>
        </ErrorBoundary>
      </AppShell>
    </SmarterFhirContext.Provider>
  );
}
