import {StyleSheet} from 'react-native';
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
  export {styles}