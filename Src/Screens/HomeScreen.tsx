import {StyleSheet, Text, View, Button, Alert,ActivityIndicator,FlatList,Image} from 'react-native';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { SafeAreaView } from 'react-native';
import styles from './Login&register/styles';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get('https://fakestoreapi.com/products').then(res=>{
      setProducts(res.data);
    }).catch(err=>console.log(err)).finally(()=>setLoading(false));
}, []);

const renderItem = ({item})=>{
  return(
    <View style={styles.wrapper}>
    <View style={styles.imagewraper}>
    <Image  source={{uri:item.image}} style={styles.image} resizeMode='contain'/></View>

    
    <View style={styles.textwraper}>
      <Text style={styles.text}>{item.title}</Text>
      <Text style={styles.text}>{item.description}</Text>
      <Text style={styles.text}>{item.price}</Text>
    </View>
    </View>
  )
}

  return (
    <SafeAreaView>
      {loading ? <View style={styles.loadingcontainer}>
        <ActivityIndicator size={'large'} color={'#00000'}/>
      </View>:<FlatList data={products}
keyExtractor={element=>element.id}
renderItem={renderItem}/>}



    </SafeAreaView>
  );
}
export default Products;
