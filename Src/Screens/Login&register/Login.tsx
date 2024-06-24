import {  Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { StyleSheet } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';

type LoginProps = {
  navigation: NavigationProp<any>;
};




const Login = ({navigation}: LoginProps) => {
    const [password, setPassword] = useState('');
const [secureTextEntry, setSecureTextEntry] = useState(true); // State to manage password visibility

const toggleSecureEntry = () => {
  setSecureTextEntry(!secureTextEntry);
};

  return (
    <View style={styles.container}>
      <Text style={styles.title} >Login</Text>
      <TextInput style={styles.input} placeholder="Email" />
  
  
 
      <TextInput 
          style={styles.input}
          placeholder="Password"
          secureTextEntry={secureTextEntry} // Toggle secure text entry based on state
          value={password}
          onChangeText={setPassword}
          
        >
            
        </TextInput>
        <TouchableOpacity onPress={toggleSecureEntry} >
       <Text style={{ textAlign: 'center', color:"white"}}> {secureTextEntry ? 'Show Password' : 'Hide Password'}</Text>
      </TouchableOpacity>
                 

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text onPress={()=>navigation.navigate('ForgetPassword')} style={styles.forgotPassword}>Forgot Password?</Text>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupButton}>Sign Up</Text>
        </TouchableOpacity>
    </View>
    </View>
  )
}

export default Login




