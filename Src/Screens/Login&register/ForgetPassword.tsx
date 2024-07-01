import React from 'react';
import { View, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input, Button, Text, Card, ThemeProvider } from 'react-native-elements';
import {styles2} from './styles';

const theme = {
  Button: {
    raised: true,
  },
  colors: {
    primary: '#fb5b5a',
    secondary: '#ffffff',
  },
};

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
    <ThemeProvider theme={theme}>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={ForgetSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleSubmit, setFieldTouched, errors, isValid, touched }) => (
          <View style={styles2.container2}>
            <Text style={styles2.logo2}>Forget Password</Text>

            <Card containerStyle={styles2.card2}>
              <Input
                placeholder="Email"
                leftIcon={{ type: 'font-awesome', name: 'envelope', color: theme.colors.secondary }}
                placeholderTextColor={theme.colors.secondary}
                inputStyle={{ color: theme.colors.secondary }}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                errorMessage={touched.email && errors.email ? errors.email : undefined}
              />
              <Button
                title="Submit"
                disabled={!isValid}
                buttonStyle={styles2.loginButton2}
                containerStyle={{ marginTop: 20 }}
                onPress={handleSubmit}
              />
            </Card>
          </View>
        )}
      </Formik>
    </ThemeProvider>
  );
};

export default ForgetPassword;