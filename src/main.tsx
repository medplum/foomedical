import { StrictMode } from 'react';
import { MedplumClient } from '@medplum/core';
import { MedplumProvider } from '@medplum/ui';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './index.css';

const medplum = new MedplumClient();

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <BrowserRouter>
      <MedplumProvider medplum={medplum}>
        <App />
      </MedplumProvider>
    </BrowserRouter>
  </StrictMode>
);
