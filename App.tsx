import { StatusBar, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import ProfileScreen from './Src/Screens/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './Src/Screens/Login&register/Login';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './Src/Screens/Login&register/Signup';
import ForgetPassword from './Src/Screens/Login&register/ForgetPassword';
import Products from './Src/Screens/HomeScreen';
import Cart from './Src/Screens/Cart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
        <Tab.Screen name="Products" component={Products}
        options={{  tabBarIcon: ({ focused }) => (
          <Icon name="home" size={25} color={focused ? "#fb5b5a" : "white"} />)}}
        />


        <Tab.Screen name="Cart" component={Cart} options={{  tabBarIcon: ({ focused }) => (
          <Icon name="shopping-cart" size={25} color={focused ? "#fb5b5a" : "white"} />)}}/>


        <Tab.Screen name="Profile" 
         options={{  tabBarIcon: ({ focused }) => (
          <Icon name="account-circle" size={25} color={focused ? "#fb5b5a" : "white"} />)}}
        >
          {(props) => <ProfileScreen {...props} setIsAuthenticated={setIsAuthenticated}
          
          />}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
}

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const authStatus = await AsyncStorage.getItem('isAuthenticated');
        if (authStatus === 'true') {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Failed to fetch auth status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleSetIsAuthenticated = async (value: boolean) => {
    try {
      await AsyncStorage.setItem('isAuthenticated', value.toString());
      setIsAuthenticated(value);
    } catch (error) {
      console.error('Failed to set auth status:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <MainTab setIsAuthenticated={handleSetIsAuthenticated} />
      ) : (
        <AuthStack setIsAuthenticated={handleSetIsAuthenticated} />
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

export default App;