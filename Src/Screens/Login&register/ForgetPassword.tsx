import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const ForgetSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Enter your email.'),
});

const ForgetPassword = () => {
  const handleSubmit = async (values: { email: string }) => {
    try {
      const jsonData = await AsyncStorage.getItem('signup_data');
      if (jsonData !== null) {
        const formData = JSON.parse(jsonData);
        if (formData.email === values.email) {
          Alert.alert('Password Retrieval', `Your password is: ${formData.password}`);
        } else {
          Alert.alert('Error', 'No user found with the provided email.');
        }
      } else {
        Alert.alert('Error', 'No user data found.');
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
      Alert.alert('Error', 'Failed to retrieve user data.');
    }
  };

  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={ForgetSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, handleSubmit, setFieldTouched, errors, isValid, touched }) => (
        <View style={styles.container}>
          <Text style={styles.logo}>Forget Password</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Email"
              placeholderTextColor="#ffffff"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          <TouchableOpacity
            disabled={!isValid}
            style={[
              styles.signUpBtn,
              { backgroundColor: isValid ? '#fb5b5a' : 'grey' },
            ]}
            onPress={handleSubmit}
          >
            <Text style={styles.signUpText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default ForgetPassword;