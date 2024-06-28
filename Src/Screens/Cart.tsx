import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

interface CartItem {
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
  quantity: number;
}

interface Props {
  route: { params: { cart: CartItem[] } };
}

const Cart: React.FC<Props> = ({ route }) => {
  const { cart: initialCart = [] } = route.params || {}; // Default to empty array if params are not provided
  const [cart, setCart] = useState<CartItem[]>(initialCart);

  const handleClearCart = () => {
    setCart([]);
  };

  const handleRemoveItem = (itemId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.heading}>Cart</Text>
        
        {cart.length === 0 ? (
          <Text style={styles.emptyCartText}>Your cart is empty.</Text>
        ) : (
          <>
            <View style={styles.cartItems}>
              {cart.map(item => (
                <View key={item.id} style={styles.item}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode='contain' />
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text>Price: ${item.price}</Text>
                  <View style={styles.quantityControl}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text>Quantity: {item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveItem(item.id)}
                  >
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total: ${getTotalPrice()}</Text>
            </View>
            <TouchableOpacity
              style={[styles.clearButton, cart.length === 0 && styles.clearButtonDisabled]}
              onPress={handleClearCart}
              disabled={cart.length === 0}
            >
              <Text style={styles.clearButtonText}>Clear Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.goToPaymentButton} >
              <Text style={styles.goToPaymentButtonText}>Go to Payment</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'black',
    color: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 20,
    backgroundColor: 'black',
  },
  heading: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyCartText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginTop: 50,
  },
  cartItems: {
    width: '100%',
  },
  item: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  itemImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  quantityButton: {
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 20,
    color: 'black',
  },
  removeButton: {
    backgroundColor: '#fb5b5a',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  removeButtonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  totalContainer: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'flex-end',
    width: '100%',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  clearButton: {
    marginTop: 20,
    backgroundColor: '#fb5b5a',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  clearButtonDisabled: {
    backgroundColor: '#ccc', // Grey out the button when disabled
  },
  clearButtonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  goToPaymentButton: {
    marginTop: 20,
    backgroundColor: '#5af55a',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  goToPaymentButtonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default Cart;