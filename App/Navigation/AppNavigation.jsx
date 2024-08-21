import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import SplashScreen from '../Screens/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import HistoryScreen from '../Screens/HistoryScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrwer from './CustomDrawer';
import { COLORS } from '../Utils/COLORS';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { FONTFAMILY, FONTSIZE } from './../Utils/Font';
import SettingsScreen from '../Screens/SettingsScreen';
import FavoritesScreen from '../Screens/FavoritesScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrwer {...props} />}
      screenOptions={{
        headerShown:false,
        drawerActiveBackgroundColor: COLORS.PRIMARY_LIGHT,
        drawerActiveTintColor: COLORS.WHITE,
        drawerInactiveTintColor:COLORS.BLACK,
        drawerLabelStyle: {
          fontFamily: FONTFAMILY.REGULAR,
          fontSize: FONTSIZE.TEXT
        }
      }}
    >
      <Drawer.Screen  
        name="Home" 
        component={HomeScreen} 
        options={{
         
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="home" size={24} color={color} />
          )
        }}
      />
      <Drawer.Screen 
        name="Favorites" 
        component={FavoritesScreen} 
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="star" size={24} color={color} />
          )
        }}
      />
      <Drawer.Screen 
        name="History" 
        component={HistoryScreen} 
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="history" size={24} color={color} />
          )
        }}
      />
      <Drawer.Screen 
        name="Settings"  
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="cog" size={24} color={color} />
          )
        }}
      />
    </Drawer.Navigator>
  )
}
