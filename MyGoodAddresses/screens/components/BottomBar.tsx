import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import Home from "../tab/Home";
import AddAddress from "../tab/AddAddressScreen";
import MapView from "../tab/MapView";
import AddressList from '../tab/AddressList';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Accueil') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Ajouter') {
            iconName = focused ? 'plus-box' : 'plus-box-outline';
          } else if (route.name === 'Carte') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Liste') {
            iconName = focused ? 'clipboard-list' : 'clipboard-list-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
   
    >
      <Tab.Screen name="Accueil" component={Home} />
      <Tab.Screen name="Ajouter" component={AddAddress} />
      <Tab.Screen name="Liste" component={AddressList} />
      <Tab.Screen name="Carte" component={MapView} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
