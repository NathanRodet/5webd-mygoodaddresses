import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Register from './screens/Register';
import { firebaseAuth } from './firebase/firebase';

// App.tsx is used as the entry point of the application.
export default function App() {
  const currentUser = firebaseAuth.currentUser;

  // Create a StackNavigator object.
  const Stack = createNativeStackNavigator();
  const stackOptions = {
    headerShown: false
  }

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={stackOptions} >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
