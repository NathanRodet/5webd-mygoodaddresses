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
  import singleAddress from "../screens/tab/singleAddress";
  import addressList from "../screens/tab/AddressList";

  import AddAddressScreen from "../screens/tab/AddAddressScreen";
  import TabNavigator from '../screens/components/BottomBar';

  export default function AppRoutes() {

    const Stack = createNativeStackNavigator();
    const currentUser = useContext(AuthContext);

    return (
      <NavigationContainer>
        { 
          (currentUser) ? (
            <Stack.Navigator initialRouteName={"Main"} screenOptions={loggedScreenOptions}>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Main" component={TabNavigator} /> 
              <Stack.Screen name="addAddress" component={AddAddressScreen} />
              <Stack.Screen name="map" component={MapView} />
              <Stack.Screen name="singleAddress" component={singleAddress} />
              <Stack.Screen name="addressList" component={addressList} />

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