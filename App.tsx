import { StatusBar, StyleSheet, Text, View } from 'react-native'
import 'react-native-gesture-handler';
import React from 'react'
import ProfileScreen from './Src/Screens/ProfileScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserScreen from './Src/Screens/UserScreen'
import Login from './Src/Screens/Login&register/Login';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './Src/Screens/Login&register/Signup';
import ForgetPassword from './Src/Screens/Login&register/ForgetPassword';
import Products from './Src/Screens/HomeScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



function AuthStack() {
  return (

    <><StatusBar backgroundColor="#000000" barStyle="light-content" /><Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'black', shadowColor: 'transparent' },
        headerTintColor: '#fff',
        headerTitle: "",
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />


    </Stack.Navigator></>

  );
}
function MainTab() {
  return (
    <><StatusBar backgroundColor="black" barStyle="light-content" />
    <Tab.Navigator
    
    screenOptions={{tabBarStyle: { backgroundColor: 'black', shadowColor: 'black' },
      headerStyle: { backgroundColor: 'black', shadowColor: 'black' },
      headerTintColor: 'white',
      tabBarActiveTintColor: '#fb5b5a',
      
    }}>

      <Tab.Screen name="Products" component={Products} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator></>
  );
}
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <AuthStack />
      ) : (
        <MainTab />
      )}
    </NavigationContainer>
  );
}

export default App

