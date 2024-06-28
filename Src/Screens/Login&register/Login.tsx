import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import styles from './styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginProps = {
  navigation: NavigationProp<any>;
};

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Enter your email.'),
  Password: Yup.string()
    .min(8, 'Password Too Short!')
    .max(50, 'Password Too Long!')
    .required('Enter your password.'),
});

const Login = ({ navigation }: LoginProps) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  

  const handleLogin = async (initialValues:any) => {
    try {
      const jsonData = await AsyncStorage.getItem('signup_data');
      if (jsonData !== null) {
        const formData = JSON.parse(jsonData);
        // Validate email and password
        // console.log('====================================');
        // console.log(formData.email, formData.password);
        // console.log('====================================');
        if (formData.email === initialValues.email && formData.password === initialValues.Password) {
          Alert.alert('Success', 'Login successful!');
          navigation.navigate('HomeScreen');
        } else {
          Alert.alert('Error', 'Invalid email or password.');
        
        }
      } else {
        Alert.alert('Error', 'No signup data found.');
      }
    } catch (error) {
      console.error('Error retrieving form data:', error);
      Alert.alert('Error', 'Failed to retrieve form data.');
    }
  }; 



  return (
    <Formik
      initialValues={{
        email: '',
        Password: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={handleLogin}
    >
      {({ values, handleChange, setFieldTouched, errors, isValid, touched, handleSubmit }) => (
        <View style={styles.container}>
          <Text style={styles.logo}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ffffff"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={() => setFieldTouched('email')}
          />
          {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#ffffff"
            secureTextEntry={secureTextEntry}
            value={values.Password}
            onChangeText={handleChange('Password')}
            onBlur={() => setFieldTouched('Password')}
          />
          {touched.Password && errors.Password && <Text style={styles.errorText}>{errors.Password}</Text>}

          <TouchableOpacity onPress={toggleSecureEntry}>
            <Text style={{ textAlign: 'center', color: 'white', marginBottom: 20 }}>
              {secureTextEntry ? 'Show Password' : 'Hide Password'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={!isValid}
            style={[styles.button, { backgroundColor: isValid ? '#fb5b5a' : 'grey' }]}
            onPress={(handleSubmit as any)}
          >
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
      )}
    </Formik>
  );
};

export default Login;