import React, { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Login&register/styles';
import profilePhoto from '../Screens/Assests/Profile.png';

type ProfileScreenProps = {
  setIsAuthenticated: (value: boolean) => void;
};

const ProfileScreen = ({ setIsAuthenticated }: ProfileScreenProps) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonData = await AsyncStorage.getItem('signup_data');
        if (jsonData !== null) {
          const formData = JSON.parse(jsonData);
          setUserName(formData.name);
          setUserEmail(formData.email);
        } else {
          Alert.alert('Error', 'No user data found.');
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
        Alert.alert('Error', 'Failed to retrieve user data.');
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Profile</Text>
      <Image source={profilePhoto} style={styles.profilePhoto} />
      <Text style={[styles.input, { backgroundColor: 'black' }]}>Name: {userName}</Text>
      <Text style={[styles.input, { backgroundColor: 'black' }]}>Email: {userEmail}</Text>

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