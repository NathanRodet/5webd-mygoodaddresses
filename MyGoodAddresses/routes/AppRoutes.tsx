import React, { useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import { AuthContext } from "../auth/AuthProvider";
import Home from "../screens/Home";
import { loggedScreenOptions } from "../screens/components/LoggedHeaderBar";

export default function AppRoutes() {

  // Create a StackNavigator object.
  const Stack = createNativeStackNavigator();

  // Get the current user from the AuthContext.
  const currentUser = useContext(AuthContext);



  return (
    <NavigationContainer>
      {
        (currentUser) ? (
          <Stack.Navigator screenOptions={loggedScreenOptions}>
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        )
      }

    </NavigationContainer >
  );
}