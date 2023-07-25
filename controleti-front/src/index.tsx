import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import reportWebVitals from './reportWebVitals';

import { PublicClientApplication, EventType, InteractionRequiredAuthError, AccountInfo } from "@azure/msal-browser";
import { loginRequest, msalConfig } from "./auth/authConfig";
import { MsalProvider } from '@azure/msal-react';
import { BrowserRouter } from 'react-router-dom';
import { callEndpointAccessToken } from './apis/callAccessToken';

export const msalInstance = new PublicClientApplication(msalConfig);

// Default to using the first account if no account is active on page load
if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

// Optional - This will update account state if a user signs in from another tab or window
msalInstance.enableAccountStorageEvents();

msalInstance.addEventCallback((event: any) => {
  if (event.eventType === EventType.LOGIN_SUCCESS) {
    const account = event.payload.account;
    msalInstance.setActiveAccount(account);
  }
});

axios.interceptors.request.use(
  async config => {
    const token = await callEndpointAccessToken().catch(e => {
        if (e instanceof InteractionRequiredAuthError) {
          msalInstance.acquireTokenRedirect({
              ...loginRequest,
              account: msalInstance.getActiveAccount() as AccountInfo
          });
      }
    });

    config.headers['Authorization'] = token ? token : 'Bearer ';
    config.withCredentials = true;
    return config;
  }
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals(process.env.NODE_ENV !== 'production' ? console.log : undefined);
