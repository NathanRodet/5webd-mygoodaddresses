import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseApp } from '../utils/firebase';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    try {
      const auth = getAuth(firebaseApp);
      await signInWithEmailAndPassword(auth, email, password);
      // Login successful, navigate to the next screen
    } catch (error) {
      console.error('Error login user:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur MesBonnesAdresses !</Text>
      <Text style={styles.subtitle}>Merci de vous authentifier pour accéder à votre compte.</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Se connecter" onPress={handleLogin} />
      <Text style={styles.subtitle}>Pas encore de compte ?</Text>
      <Button title="Créer un compte" onPress={() => { }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  subtitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Login;