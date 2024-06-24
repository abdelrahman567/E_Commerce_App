import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import styles from './styles'; 

type LoginProps = {
  navigation: NavigationProp<any>;
};

const Login = ({ navigation }: LoginProps) => {
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true); // State to manage password visibility

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Login</Text>
      <TextInput style={styles.input} placeholder="Email"           placeholderTextColor="#ffffff"
 />

      <TextInput
        style={styles.input}
         
          placeholderTextColor="#ffffff"
        placeholder="Password"
        secureTextEntry={secureTextEntry} // Toggle secure text entry based on state
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={toggleSecureEntry}>
        <Text style={{ textAlign: 'center', color: 'white', marginBottom: 20 }}>
          {secureTextEntry ? 'Show Password' : 'Hide Password'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text onPress={() => navigation.navigate('ForgetPassword')} style={styles.forgotPassword}>
        Forgot Password?
      </Text>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupButton}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
