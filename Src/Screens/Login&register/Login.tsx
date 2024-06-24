import {  Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationProp, useNavigation } from '@react-navigation/native';

type LoginProps = {
  navigation: NavigationProp<any>;
};

const Login = ({navigation}: LoginProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title} >Login</Text>
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />
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
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      paddingHorizontal: 20,
    },
    title: {
        color: '#ffff',
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 40,
    },
    input: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 20,
      backgroundColor: '#fff',
    },
    button: {
      width: '100%',
      height: 50,
      backgroundColor: '#007BFF',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      marginBottom: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    forgotPassword: {
      color: '#007BFF',
      marginBottom: 20,
    },
    signupContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    signupText: {
      color: '#888',
    },
    signupButton: {
      color: '#007BFF',
      marginLeft: 5,
    },
  })
export default Login



import { StyleSheet } from "react-native"

