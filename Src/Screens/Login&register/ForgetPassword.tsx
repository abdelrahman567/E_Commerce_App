import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from './styles'

const ForgetPassword = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Forget Password</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#ffffff"
          onChangeText={text => (text)}
        />
      </View>
      
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="User Name"
          placeholderTextColor="#ffffff"
          onChangeText={text => (text)}
        />
        
      </View>
      <TouchableOpacity style={styles.signUpBtn} >
        <Text style={styles.signUpText}>Submit</Text>
      </TouchableOpacity>
    </View>
    
  )
}

export default ForgetPassword

