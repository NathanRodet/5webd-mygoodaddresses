import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../firebase';

async function firebaseRegister(email: string, password: string, navigation: any) {
  try {
    await createUserWithEmailAndPassword(firebaseAuth, email, password);
    console.log('User registered successfully!');
  } catch (error) {
    console.error('Error registering user:', error);
  }
}

const Register = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    await firebaseRegister(email, password, navigation);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur MesBonnesAdresses !</Text>
      <Text style={styles.subtitle}>Remplissez les champs ci-dessous pour créer votre compte.</Text>
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
      <Button title="Créer mon compte" onPress={handleRegister} />
      <Text style={styles.subtitle}>Déjà un compte ?</Text>
      <Button title="Se connecter" onPress={() => navigation.navigate('Login')} />
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

export default Register;
