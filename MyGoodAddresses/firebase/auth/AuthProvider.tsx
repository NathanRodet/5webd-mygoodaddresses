import React, { createContext, useEffect, useMemo, useState } from 'react';
import { firebaseAuth } from '../firebase';
import { FirebaseDefaultUser } from '../../models/users';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

export const AuthContext = createContext<{ currentUser: FirebaseDefaultUser | null, firebaseLogin: (email: string, password: string) => void } | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<FirebaseDefaultUser | null>(null);
  const [loading, setLoading] = useState(true);

  function firebaseLogin(email: string, password: string) {
    try {
      signInWithEmailAndPassword(firebaseAuth, email, password);
      console.log('User logged in successfully!');
    } catch (error) {
      console.error('Error login user:', error);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      console.log("user", user);
      setCurrentUser(user as FirebaseDefaultUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = useMemo(() => ({ currentUser, firebaseLogin }), [currentUser, firebaseLogin]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
