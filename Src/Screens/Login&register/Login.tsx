import React, { useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Input, Button, Text, Icon, Card, ThemeProvider } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles2 } from './styles';

type LoginProps = {
  navigation: NavigationProp<any>;
  setIsAuthenticated: (value: boolean) => void;
};

const theme = {
  Button: {
    raised: true,
  },
  colors: {
    primary: '#fb5b5a',
    secondary: '#ffffff',
  },
};

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Enter your email.'),
  Password: Yup.string()
    .min(8, 'Password Too Short!')
    .max(50, 'Password Too Long!')
    .required('Enter your password.'),
});

const Login = ({ navigation, setIsAuthenticated }: LoginProps) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleLogin = async (initialValues: any) => {
    try {
      const jsonData = await AsyncStorage.getItem('signup_data');
      if (jsonData !== null) {
        const formData = JSON.parse(jsonData);
        if (formData.email === initialValues.email && formData.password === initialValues.Password) {
          Alert.alert('Success', 'Login successful!');
          await AsyncStorage.setItem('isAuthenticated', 'true');
          setIsAuthenticated(true); // auths state
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
    <ThemeProvider theme={theme}>
      <Formik
        initialValues={{
          email: '',
          Password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ values, handleChange, setFieldTouched, errors, isValid, touched, handleSubmit }) => (
          <View style={styles2.container2}>
            <Text style={styles2.logo2}>Login</Text>

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

              <Input
                placeholder="Password"
                leftIcon={{ type: 'font-awesome', name: 'lock', color: theme.colors.secondary }}
                placeholderTextColor={theme.colors.secondary}
                inputStyle={{ color: theme.colors.secondary }}
                secureTextEntry={secureTextEntry}
                rightIcon={
                  <Icon
                    type="font-awesome"
                    name={secureTextEntry ? 'eye-slash' : 'eye'}
                    color={theme.colors.secondary}
                    onPress={toggleSecureEntry}
                  />
                }
                value={values.Password}
                onChangeText={handleChange('Password')}
                onBlur={() => setFieldTouched('Password')}
                errorMessage={touched.Password && errors.Password ? errors.Password : undefined}
              />

              <Button
                title="Login"
                disabled={!isValid}
                buttonStyle={styles2.loginButton2}
                containerStyle={{ marginTop: 20 }}
                onPress={(handleSubmit as any)}
              />

              <Text onPress={() => navigation.navigate('ForgetPassword')} style={styles2.forgotPassword2}>
                Forgot Password?
              </Text>
            </Card>

            <View style={styles2.signupContainer2}>
              <Text style={styles2.signupText2}>Don't have an account?</Text>
              <Button
                type="clear"
                title="Sign Up"
                titleStyle={{ color: theme.colors.primary }}
                onPress={() => navigation.navigate('Signup')}
              />
            </View>
          </View>
        )}
      </Formik>
    </ThemeProvider>
  );
};


export default Login;