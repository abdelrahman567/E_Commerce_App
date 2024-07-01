import React, { useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Input, Button, Text, Icon, Card, ThemeProvider } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp } from '@react-navigation/native';
import { styles2 } from './styles';

const theme = {
  Button: {
    raised: true,
  },
  colors: {
    primary: '#fb5b5a',
    secondary: '#ffffff',
  },
};

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
  const [secureTextEntry, setSecureTextEntry] = useState(true);

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
    <ThemeProvider theme={theme}>
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
          <View style={styles2.container2}>
            <Text style={styles2.logo2}>Sign Up</Text>

            <Card containerStyle={styles2.card2}>
              <Input
                placeholder="Name"
                leftIcon={{ type: 'font-awesome', name: 'user', color: theme.colors.secondary }}
                placeholderTextColor={theme.colors.secondary}
                inputStyle={{ color: theme.colors.secondary }}
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={() => setFieldTouched('name')}
                errorMessage={touched.name && errors.name ? errors.name : undefined}
              />

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
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                errorMessage={touched.password && errors.password ? errors.password : undefined}
              />

              <Input
                placeholder="Repeat Password"
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
                value={values.repeatPassword}
                onChangeText={handleChange('repeatPassword')}
                onBlur={() => setFieldTouched('repeatPassword')}
                errorMessage={touched.repeatPassword && errors.repeatPassword ? errors.repeatPassword : undefined}
              />

              <Button
                title="Sign Up"
                disabled={!isValid}
                buttonStyle={styles2.loginButton2}
                containerStyle={{ marginTop: 20 }}
                onPress={(handleSubmit as any)}
              />
            </Card>

            <View style={styles2.signupContainer2}>
              <Text style={styles2.signupText2}>Already have an account?</Text>
              <Button
                type="clear"
                title="Login"
                titleStyle={{ color: theme.colors.primary }}
                onPress={() => navigation.navigate('Login')}
              />
            </View>
          </View>
        )}
      </Formik>
    </ThemeProvider>
  );
};

export default SignUpScreen;