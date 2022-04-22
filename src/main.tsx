import { MedplumClient } from '@medplum/core';
import { MedplumProvider } from '@medplum/ui';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './index.css';

const medplum = new MedplumClient();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MedplumProvider medplum={medplum}>
        <App />
      </MedplumProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
