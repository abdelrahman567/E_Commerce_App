import {StyleSheet, Text, View, Button} from 'react-native';

function ProfileScreen() {
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.headingStyle}>ProfileScreen</Text>
      <Text style={styles.textStyle}>This is it</Text> 
     
    </View>
  );
}
const styles = StyleSheet.create({
  viewStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textStyle: {
    fontSize: 28,
    color: 'black',
  },
  headingStyle: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
  },
});
export default ProfileScreen;
