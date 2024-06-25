import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, FlatList, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import styles from './Login&register/styles'

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.wrapper}>
      
     
    <View style={styles.wrapper2}>
        <View style={styles.imagewraper}>
        <Text style={styles.title2}>{item.title}</Text>
          <Image source={{ uri: item.image }} style={styles.image} resizeMode='contain' />
        </View>
        <View style={styles.textWrapper}>
        
          <Text style={styles.description}>Description: {item.description}</Text>
          <Text style={styles.price}>Price: ${item.price}</Text>
          <TouchableOpacity style={[styles.signUpBtn,{backgroundColor:'#fb5b5a'}]}>
            <Text style={[styles.signUpText,{backgroundColor:'#fb5b5a'}]}>Add to Cart</Text>
          </TouchableOpacity>

        </View>
      </View></View>
       
  );

  return (
    <SafeAreaView style={styles.container2}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color='#fb5b5a' />
        </View>
      ) : (
        <FlatList 
          data={products}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
}

export default Products;
