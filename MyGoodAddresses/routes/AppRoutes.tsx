import React, { useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { loggedScreenOptions } from "../screens/components/LoggedHeaderBar";
import Login from '../screens/Login';
import Register from '../screens/Register';
import { AuthContext } from "../auth/AuthProvider";
import Home from "../screens/tab/Home";
import MenuSettings from "../screens/settings/MenuSettings";
import AvatarSelection from "../screens/settings/AvatarSelection";
import MapView from "../screens/tab/MapView";
import AddAddressScreen from "../screens/tab/AddAddressScreen";


export default function AppRoutes() {

  // Create a StackNavigator object.
  const Stack = createNativeStackNavigator();

  // Get the current user from the AuthContext.
  const currentUser = useContext(AuthContext);

  return (
    <NavigationContainer>
      {
        (currentUser) ? (
          <Stack.Navigator initialRouteName={"MesBonnesAddresses"} screenOptions={loggedScreenOptions}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="map" component={MapView} />
            <Stack.Screen name="addAddress" component={AddAddressScreen} />
            <Stack.Screen name="MenuSettings" component={MenuSettings} />
            <Stack.Screen name="AvatarSelection" component={AvatarSelection} />
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