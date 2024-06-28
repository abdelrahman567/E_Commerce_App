import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Login&register/styles';

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
      <Text style={styles.logo}>Profile</Text>
      <Text style={[styles.input,{backgroundColor:'black'}]}>Name: {userName}</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#fb5b5a' }]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;