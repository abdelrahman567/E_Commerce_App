import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp } from '@react-navigation/native';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name Too Short!')
    .max(30, 'Name Too Long!')
    .required('Enter your name.'),

  email: Yup.string().email('Invalid email').required('Enter your email.'),
  password: Yup.string()
    .min(8, 'Password Too Short!')
    .max(50, 'Password Too Long!')
    .required('Enter your password.'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Repeat your password.'),
});

const SignUpScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true); // State to manage password visibility

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const saveFormData = async (formData: any) => {
    try {
      const jsonData = JSON.stringify(formData);
      await AsyncStorage.setItem('signup_data', jsonData);
      Alert.alert('Success', 'Signed up successfully!');

    } catch (error) {
      console.error('Error saving form data:', error);
      Alert.alert('Error', 'Failed to save form data.');
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={(values: any, { resetForm }: any) => {
        saveFormData(values);
        resetForm();
      }}
    >
      {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (
        <View style={styles.container}>
          <Text style={styles.logo}>Sign Up</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Name"
              placeholderTextColor="#ffffff"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={() => setFieldTouched('name')}
            />
            {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Email"
              placeholderTextColor="#ffffff"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Password"
              placeholderTextColor="#ffffff"
              secureTextEntry={secureTextEntry} // Toggle secure text entry based on state
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={() => setFieldTouched('password')}
            />
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Repeat Password"
              placeholderTextColor="#ffffff"
              secureTextEntry={secureTextEntry} // Toggle secure text entry based on state
              value={values.repeatPassword}
              onChangeText={handleChange('repeatPassword')}
              onBlur={() => setFieldTouched('repeatPassword')}
            />
            {touched.repeatPassword && errors.repeatPassword && (
              <Text style={styles.errorText}>{errors.repeatPassword}</Text>
            )}
            <View>
              <TouchableOpacity onPress={toggleSecureEntry}>
                <Text style={{ textAlign: 'center', color: 'white', marginBottom: 0, marginTop: 10 }}>
                  {secureTextEntry ? 'Show Password' : 'Hide Password'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            disabled={!isValid}
            style={[
              styles.signUpBtn,
              { backgroundColor: isValid ? '#fb5b5a' : 'grey' },
            ]}
            onPress={(handleSubmit as any)}
          >
            <Text style={styles.signUpText}>SIGN UP</Text>
          </TouchableOpacity>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Alreadys have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signupButton}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
        
      )}
    </Formik>
  );
};

export default SignUpScreen;