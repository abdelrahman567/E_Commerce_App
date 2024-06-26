
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
    backgroundColor: 'grey',
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
  width: 150,
  height: 150,
},
wrapper:{
  backgroundColor: 'white',
  borderRadius: 50,
  marginBottom: 20,
  marginTop: 20,
  padding: 10,
  flexDirection: 'row', // Added to align items horizontally
  
},
wrapper2:{
  backgroundColor: 'white',
  borderRadius: 50,
  marginBottom: 20,
  padding: 10,
  //flexDirection: 'row', // Added to align items horizontally


  
},
imagewraper:{
  alignItems: 'center',
  marginBottom: 10,
  marginRight: 10, 

},
textWrapper: {
  alignItems: 'center',
  flex: 1, 
  justifyContent: 'center', 
},
text:{
marginVertical: 5, 
},
title2: {
  color: 'black',
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 5,
  textAlign: 'center',
  alignContent: 'center',
},
description: {
  color: 'black',
  fontSize: 14,
  textAlign: 'center',
  marginBottom: 5,
},

price: {
  color: '#fb5b5a',
  fontSize: 16,
  fontWeight: 'bold',
},
container2: {
  flex: 1,
  backgroundColor: 'black',
  padding: 10,
},
loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
searchBar: {
  height: 40,
  borderColor: '#fb5b5a',
  borderWidth: 1,
  borderRadius: 50,
  paddingHorizontal: 30,
  margin: 5,
  backgroundColor: '#fff'
},

//////
searchBar2: {
  height: 40,
  borderColor: '#fb5b5a',
  borderWidth: 1,
  borderRadius: 5,
  paddingHorizontal: 10,
  margin: 0,
  backgroundColor: '#fff'
},
categoryScroll: {
  flexDirection: 'row',
  marginVertical: 10,
  marginHorizontal: 5,
  marginBottom: 10,
},
header: {
  backgroundColor: '#6200ee',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  zIndex: 1000,
  paddingTop: 20, // Adjust this based on your design
},
categoryBtn: {
  paddingVertical: 0,
  paddingHorizontal: 15, 
  width: 'auto', 
  borderRadius: 20,
  borderWidth: 1,
  borderColor: '#fb5b5a',
  marginRight: 10,
  alignItems: 'center',
  justifyContent: 'center',
  height: 40, 
  paddingBottom: 5,
  marginBottom: 15,
},
categoryText: {
  color: '#fb5b5a',
  fontWeight: 'bold',
  fontSize: 12, 
  
},
selectedCategoryBtn: {
  backgroundColor: 'white',
},

noProductContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingBottom: 250,
},
noProductText: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#fb5b5a',
},


cartContainer: {
  position: 'absolute',
  bottom: 0,
  width: '110%',
  padding: 10,
  backgroundColor: 'black',
  borderTopWidth: 1,
  borderTopColor: 'black',
  alignItems: 'center',
  flexDirection: 'row',
},
cartText: {
  color: '#fb5b5a',
  fontWeight: 'bold',
  fontSize: 16,
},
clearCartText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},
clearCartBtn: {
  paddingVertical: 5,
  paddingHorizontal: 10,
  borderRadius: 15,
  borderWidth: 1,
  borderColor: '#fb5b5a',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 100
},

checkoutText: { // new style for checkout text
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},
checkoutBtn: { // new style for checkout button
  paddingVertical: 5,
  paddingHorizontal: 10,
  borderRadius: 15,
  borderWidth: 1,
  borderColor: '#fb5b5a',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft:10
},

cartInfo: {
  flexDirection: 'column', // new style for left section
  alignItems: 'flex-start'
},
cartActions: {
  flexDirection: 'row', // new style for right section
  justifyContent: 'flex-end',
},
//////

});





export default styles;
