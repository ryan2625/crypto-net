//@ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthContextProvider } from './Contexts/AuthContext';
import App from './App';

/**
 *  The entry point for the application is wrapped in the AuthContextProvider. This is so that the entire application 
 *  has access to the AuthContext and knows when a user is logged in or not, and enables them to make authorized  
 * requests to the server.
 */

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);

