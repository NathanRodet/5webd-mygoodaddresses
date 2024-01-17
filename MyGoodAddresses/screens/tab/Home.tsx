import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { AuthContext } from '../../auth/AuthProvider';

const Home = () => {
  const currentUser = useContext(AuthContext);

  const randomGreeting = () => {
    const greetings = ['Welcome', 'Hello', 'Hi', 'Greetings'];
    const randomIndex = Math.floor(Math.random() * greetings.length);
    return greetings[randomIndex];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{randomGreeting()}</Text>
      <Text style={styles.subtitle}>{currentUser?.email}</Text>
      <Text style={styles.subtitle}>This is a random landing page!</Text>
      <Button title="Get Started" onPress={() => console.log('Button pressed!')} />
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
});

export default Home;
