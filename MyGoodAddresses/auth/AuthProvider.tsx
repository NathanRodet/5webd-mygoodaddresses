import React, { createContext, useEffect, useMemo, useState } from 'react';
import { firebaseAuth } from '../firebase';
import { FirebaseDefaultUser } from '../models/users';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext<FirebaseDefaultUser | null>(null);

export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [currentUser, setCurrentUser] = useState<FirebaseDefaultUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setCurrentUser(user as FirebaseDefaultUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = useMemo(() => (currentUser), [currentUser]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
