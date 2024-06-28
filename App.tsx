import { StatusBar, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import ProfileScreen from './Src/Screens/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './Src/Screens/Login&register/Login';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './Src/Screens/Login&register/Signup';
import ForgetPassword from './Src/Screens/Login&register/ForgetPassword';
import Products from './Src/Screens/HomeScreen';
import Cart from './Src/Screens/Cart';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AuthStack({ setIsAuthenticated }: { setIsAuthenticated: (value: boolean) => void }) {
  return (
    <>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: 'black', shadowColor: 'transparent' },
          headerTintColor: '#fff',
          headerTitle: "",
        }}
      >
        <Stack.Screen name="Login">
          {(props) => <Login {...props} setIsAuthenticated={setIsAuthenticated} />}
        </Stack.Screen>
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      </Stack.Navigator>
    </>
  );
}

function MainTab({ setIsAuthenticated }: { setIsAuthenticated: (value: boolean) => void }) {
  return (
    <>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Tab.Navigator
        initialRouteName='Products'
        screenOptions={{
          tabBarStyle: { backgroundColor: 'black', shadowColor: 'black' },
          headerStyle: { backgroundColor: 'black', shadowColor: 'black' },
          headerTintColor: 'white',
          tabBarActiveTintColor: '#fb5b5a',
        }}
      >
        <Tab.Screen name="Products" component={Products} />
        <Tab.Screen name="Cart" component={Cart} />
        <Tab.Screen name="Profile">
          {(props) => <ProfileScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
}

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <MainTab setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <AuthStack setIsAuthenticated={setIsAuthenticated} />
      )}
    </NavigationContainer>
  );
}

export default App;