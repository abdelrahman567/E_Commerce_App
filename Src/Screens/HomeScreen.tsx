import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, FlatList, Image, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Modal } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import styles from './Login&register/styles';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface CartItem extends Product {
  quantity: number;
}

const Products: React.FC = () => {
  const navigation = useNavigation();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    setLoading(true);
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));

    axios.get('https://fakestoreapi.com/products/categories')
      .then(res => {
        setCategories(['All', ...res.data]);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const filtered = products.filter(product => 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory && selectedCategory !== 'All' ? product.category === selectedCategory : true)
    );
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (product: Product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleCheckout = () => {
    navigation.navigate('Cart', { cart }); // Navigate to Cart screen with cart data
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleMoreDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.wrapper}>
      <View style={styles.wrapper2}>
        <View style={styles.imagewraper}>
          <Text style={styles.title2}>{item.title}</Text>
          <Image source={{ uri: item.image }} style={styles.image} resizeMode='contain' />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.price}>Price: ${item.price}</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={[styles.signUpBtn2, { backgroundColor: '#007bff', marginRight: 10 }]} onPress={() => handleMoreDetails(item)}>
              <Text style={[styles.signUpText2, { backgroundColor: '#007bff' }]}>More Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.signUpBtn2, { backgroundColor: '#fb5b5a' }]} onPress={() => handleAddToCart(item)}>
              <Text style={[styles.signUpText2, { backgroundColor: '#fb5b5a' }]}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCart([]); // Clear cart when navigating back to Products screen
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container2}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color='#fb5b5a' />
        </View>
      ) : (
        <>
          <TextInput 
            style={styles.searchBar2}
            placeholder="Search Products..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <ScrollView horizontal style={styles.categoryScroll}>
            {categories.map(category => (
              <TouchableOpacity 
                key={category}
                style={[styles.categoryBtn, selectedCategory === category && styles.selectedCategoryBtn]}
                onPress={() => handleCategorySelect(category)}
              >
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {filteredProducts.length === 0 && ( // Conditionally render no products found message
            <View style={styles.noProductContainer}>
              <Text style={styles.noProductText}>No products found. Consider refining your search.</Text>
            </View>
          )}

          {filteredProducts.length > 0 && ( // Render product list if products are found
            <FlatList 
              data={filteredProducts}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
            />
          )}

          <View style={styles.cartContainer}>
            <View style={styles.cartInfo}>
              <Text style={styles.cartText}>Cart: {getTotalItems()} items</Text>
              <Text style={styles.cartText}>Total: ${getTotalPrice()}</Text>
            </View>
            <View style={styles.cartActions}>
              <TouchableOpacity style={[styles.clearCartBtn, { backgroundColor: '#fb5b5a' }]} onPress={handleClearCart}>
                <Text style={styles.clearCartText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.checkoutBtn, { backgroundColor: cart.length > 0 ? '#5af55a' : '#ddd' }]} 
                onPress={() => {
                  handleCheckout(); // Navigate to Cart screen
                  setCart([]); // Clear cart after navigating to Cart screen
                }}
              >
                <Text style={styles.checkoutText}>Save to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>

          {selectedProduct && (
            <Modal
              visible={true}
              transparent={true}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.detailsContainer}>
                  <Text style={styles.title2}>{selectedProduct.title}</Text>
                  <Image source={{ uri: selectedProduct.image }} style={styles.image} resizeMode='contain' />
                  <Text style={styles.description}>Description: {selectedProduct.description}</Text>
                  <Text style={styles.price}>Price: ${selectedProduct.price}</Text>
                  <Text style={styles.rating}>Rating: {selectedProduct.rating.rate}</Text>
                  <Text style={styles.count}>Count: {selectedProduct.rating.count}</Text>
                  <TouchableOpacity
                    style={[styles.signUpBtn, { backgroundColor: '#007bff', marginTop: 10 }]}
                    onPress={() => setSelectedProduct(null)}
                  >
                    <Text style={[styles.signUpText, { backgroundColor: '#007bff' }]}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
        </>
      )}
    </SafeAreaView>
  );
}

export default Products;