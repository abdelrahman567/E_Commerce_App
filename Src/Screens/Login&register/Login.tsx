import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import styles from './styles'; 
import { Formik } from 'formik';
import * as Yup from 'yup';

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
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true); 

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <Formik initialValues={{
        email: '',
        Password: '',
    }}
    validationSchema={LoginSchema}
    >
        {({values, handleChange,setFieldTouched, errors,isValid, touched}) => (

    <View style={styles.container}>
      <Text style={styles.logo}>Login</Text>
      <TextInput style={styles.input} placeholder="Email"
        placeholderTextColor="#ffffff"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={()=>setFieldTouched('email')}
            
            />
            {touched.email && errors.email && (<Text style={styles.errorText}>{errors.email}</Text>)} 

      <TextInput
        style={styles.input}
         
          placeholderTextColor="#ffffff"
        placeholder="Password"
        secureTextEntry={secureTextEntry} 
        value={values.Password}
          onChangeText={handleChange('Password')}
          onBlur={()=>setFieldTouched('Password')}
      />
        {touched.Password && errors.Password && (<Text style={styles.errorText}>{errors.Password}</Text>)} 

      <TouchableOpacity onPress={toggleSecureEntry}>
        <Text style={{ textAlign: 'center', color: 'white', marginBottom: 20 }}>
          {secureTextEntry ? 'Show Password' : 'Hide Password'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity   disabled={!isValid}
      style={[styles.button,
        {backgroundColor:isValid?'#fb5b5a':'grey',}]
        } 
        
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
