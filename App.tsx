import { StyleSheet, Text, View } from 'react-native'
import 'react-native-gesture-handler';
import React from 'react'
import HomeScreen from './Src/Screens/HomeScreen'
import ProfileScreen from './Src/Screens/ProfileScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserScreen from './Src/Screens/UserScreen'
import Login from './Src/Screens/Login&register/Login';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './Src/Screens/Login&register/Signup';
import ForgetPassword from './Src/Screens/Login&register/ForgetPassword';
import { shadow } from 'react-native-paper';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator 
    screenOptions={{
    headerStyle: { backgroundColor: 'black',   shadowColor: 'transparent'},
    headerTintColor: '#fff',
    headerTitle:"",
      
}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="User" component={UserScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  
  
  )
}

export default App

