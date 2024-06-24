import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from './styles'
import { Formik } from 'formik'
import * as Yup from 'yup';


const ForgetSchema = Yup.object().shape({
    
    email: Yup.string().email('Invalid email').required('Enter your email.'),
    
   
  });

const ForgetPassword = () => {
  return (
    <Formik initialValues={{email:''}}validationSchema={ForgetSchema}>
         {({values, handleChange,setFieldTouched, errors,isValid, touched}) => (
    <View style={styles.container}>
      <Text style={styles.logo}>Forget Password</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#ffffff"
          value={values.email}
            onChangeText={handleChange('email')}
            onBlur={()=>setFieldTouched('email')}
        />
        {touched.email && errors.email && (<Text style={styles.errorText}>{errors.email}</Text>)} 

      </View>
      
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="User Name"
          placeholderTextColor="#ffffff"
          onChangeText={text => (text)}
        />
        
      </View>
      <TouchableOpacity disabled={!isValid}
      style={[styles.signUpBtn,
        {backgroundColor:isValid?'#fb5b5a':'grey',}]} >
        <Text style={styles.signUpText}>Submit</Text>
      </TouchableOpacity>
    </View>
    )}
    </Formik>
    
  )
}

export default ForgetPassword

