import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from './Src/Screens/HomeScreen'
import ProfileScreen from './Src/Screens/ProfileScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserScreen from './Src/Screens/UserScreen'

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  </NavigationContainer>
  )
}

export default App

