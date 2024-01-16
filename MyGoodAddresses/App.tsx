import React, { useContext } from 'react';
import { AuthContext } from './firebase/auth/AuthProvider';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  const currentUser = useContext(AuthContext);

  console.log("currentUser", currentUser);

  return (
    <AuthContext.Provider value={currentUser}>
      <AppRoutes />
    </AuthContext.Provider>
  );
}
