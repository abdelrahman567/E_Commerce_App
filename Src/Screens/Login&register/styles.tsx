
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000000', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20, 
 
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#ffffff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#333333',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 20,
    color: '#ffffff',
  },
  button: {
    width: '100%',
    //backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotPassword: {
    marginTop: 20,
    color: '#ffffff',
    fontSize: 14,
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signupText: {
    color: '#ffffff',
    fontSize: 14,
  },
  signupButton: {
    color: '#fb5b5a',
    fontSize: 14,
    marginLeft: 5,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#ffffff',
    marginBottom: 40,
  },

 
  inputView: {
    width: '80%',
    backgroundColor: '#333333',
    borderRadius: 25,
    height: 55,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 15,
  },
  inputText: {
    height: 50,
    color: 'white',

  },
  signUpBtn: {
    width: '80%',
    //backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  signUpText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorText:{
color: "red",
fontSize: 12,
},
loadingcontainer:{
alignContent: 'center',
justifyContent: 'center',

},
image:{
  width: 130,
  height: 130,
},
wrapper:{
alignItems: 'center',
justifyContent: 'center',
flexDirection: 'row',
marginVertical: 30,
borderWidth: 1,
borderColor: '#fb5b5a',
padding: 10,
},
imagewraper:{
flex: 1,  
},
textwraper:{
flex: 2,
},
text:{
marginVertical: 5, 
},
});

export default styles;