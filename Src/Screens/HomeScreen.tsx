import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, FlatList, Image, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Modal } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { stylesprod } from './Login&register/styles';
import { color } from 'react-native-elements/dist/helpers';

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
        // Otherwise, add the product to cart with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleCheckout = () => {
    navigation.navigate('Cart', { cart }); // Navigate to Cart screen with cart data
    setCart([]); // Clear cart after navigating to Cart screen
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
    <View style={stylesprod.card}>
      <View style={stylesprod.cardImageContainer}>
        <Image source={{ uri: item.image }} style={stylesprod.cardImage} resizeMode='contain' />
      </View>
      <View style={stylesprod.cardDetails}>
        <Text style={stylesprod.cardTitle}>{item.title}</Text>
        <Text style={stylesprod.cardDescription}>Price: ${item.price}</Text>
        <View style={stylesprod.cardButtons}>
          <TouchableOpacity style={[stylesprod.cardButton, { backgroundColor: '#007bff' }]} onPress={() => handleMoreDetails(item)}>
            <Text style={stylesprod.cardButtonText}>More Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[stylesprod.cardButton, { backgroundColor: '#fb5b5a' }]} onPress={() => handleAddToCart(item)}>
            <Text style={stylesprod.cardButtonText}>Add to Cart</Text>
          </TouchableOpacity>
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
    <SafeAreaView style={stylesprod.container}>
      {loading ? (
        <View style={stylesprod.loadingContainer}>
          <ActivityIndicator size='large' color='#fb5b5a' />
        </View>
      ) : (
        <>
          <TextInput 
            style={stylesprod.searchBar}
            placeholder="Search Products..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <ScrollView horizontal style={stylesprod.categoryScroll}>
            {categories.map(category => (
              <TouchableOpacity 
                key={category}
                style={[stylesprod.categoryBtn, selectedCategory === category && stylesprod.selectedCategoryBtn]}
                onPress={() => handleCategorySelect(category)}
              >
                <Text style={stylesprod.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {filteredProducts.length === 0 && ( // Conditionally render no products found message
            <View style={stylesprod.noProductContainer}>
              <Text style={stylesprod.noProductText}>No products found. Consider refining your search.</Text>
            </View>
          )}

          {filteredProducts.length > 0 && ( // Render product list if products are found
            <FlatList 
              data={filteredProducts}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
            />
          )}

          <View style={stylesprod.cartContainer}>
            <View style={stylesprod.cartInfo}>
              <Text style={stylesprod.cartText}>Cart: {getTotalItems()} items</Text>
              <Text style={stylesprod.cartText}>Total: ${getTotalPrice()}</Text>
            </View>
            <View style={stylesprod.cartActions}>
              <TouchableOpacity style={[stylesprod.clearCartBtn, { backgroundColor: '#fb5b5a' }]} onPress={handleClearCart}>
                <Text style={stylesprod.clearCartText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[stylesprod.checkoutBtn, { backgroundColor: cart.length > 0 ? '#5af55a' : '#ddd' }]} 
                disabled={cart.length === 0}
                onPress={handleCheckout}
              >
                <Text style={stylesprod.checkoutText}>Save to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>

          {selectedProduct && (
            <Modal
              visible={true}
              transparent={true}
              animationType="slide"
            >
              <View style={stylesprod.modalContainer}>
                <View style={stylesprod.detailsContainer}>
                  <Text style={stylesprod.title}>{selectedProduct.title}</Text>
                  <Image source={{ uri: selectedProduct.image }} style={stylesprod.image} resizeMode='contain' />
                  <Text style={stylesprod.description}>Description: {selectedProduct.description}</Text>
                  <Text style={stylesprod.price}>Price: ${selectedProduct.price}</Text>
                  <Text style={stylesprod.rating}>Rating: {selectedProduct.rating.rate}</Text>
                  <Text style={stylesprod.count}>Count: {selectedProduct.rating.count}</Text>
                  <TouchableOpacity
                    style={[stylesprod.cardButton, { backgroundColor: '#007bff', marginTop: 10 }]}
                    onPress={() => setSelectedProduct(null)}
                  >
                    <Text style={stylesprod.cardButtonText}>Close</Text>
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