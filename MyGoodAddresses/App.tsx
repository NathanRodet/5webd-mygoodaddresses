import React from 'react';
import { AuthProvider } from './auth/AuthProvider';
import AppRoutes from './routes/AppRoutes';

export default function App() {

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider >
  );
}
