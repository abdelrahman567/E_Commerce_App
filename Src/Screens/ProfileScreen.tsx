import React, { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity, Image, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import styles from './Login&register/styles';
import profilePhoto from '../Screens/Assests/Profile.png';

type ProfileScreenProps = {
  setIsAuthenticated: (value: boolean) => void;
};

const ProfileScreen = ({ setIsAuthenticated }: ProfileScreenProps) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [profilePhotoUri, setProfilePhotoUri] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonData = await AsyncStorage.getItem('signup_data');
        if (jsonData !== null) {
          const formData = JSON.parse(jsonData);
          setUserName(formData.name);
          setUserEmail(formData.email);
          setProfilePhotoUri(formData.profilePhotoUri || null);
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

  const handleProfilePhotoUpload = () => {
    const options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const source = response.assets[0].uri;
        setProfilePhotoUri(source);
        saveProfilePhotoUri(source); // Call a function to save the URI
      }
    });
  };

  const saveProfilePhotoUri = async (uri: string) => {
    try {
      const jsonData = await AsyncStorage.getItem('signup_data');
      if (jsonData !== null) {
        const formData = JSON.parse(jsonData);
        formData.profilePhotoUri = uri;
        await AsyncStorage.setItem('signup_data', JSON.stringify(formData));
      }
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Error', 'Failed to save profile photo.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Profile</Text>
      <TouchableOpacity onPress={handleProfilePhotoUpload}>
        <Image
          source={profilePhotoUri ? { uri: profilePhotoUri } : profilePhoto}
          style={styles.profilePhoto}
        />
      </TouchableOpacity>
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