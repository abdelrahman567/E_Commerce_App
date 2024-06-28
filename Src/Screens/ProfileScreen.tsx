import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ProfileScreenProps = {
  setIsAuthenticated: (value: boolean) => void;
};

const ProfileScreen = ({ setIsAuthenticated }: ProfileScreenProps) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const jsonData = await AsyncStorage.getItem('signup_data');
        if (jsonData !== null) {
          const formData = JSON.parse(jsonData);
          setUserName(formData.name);
        } else {
          Alert.alert('Error', 'No user data found.');
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
        Alert.alert('Error', 'Failed to retrieve user data.');
      }
    };

    fetchUserName();
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
      <Text style={styles.text}>Name: {userName}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ProfileScreen;