import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {

  // Create a StackNavigator object.
  const Stack = createNativeStackNavigator();
  const stackOptions = {
    headerShown: false
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={stackOptions} >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}