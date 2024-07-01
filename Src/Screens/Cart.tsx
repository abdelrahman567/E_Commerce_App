import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Image, Button, ListItem } from 'react-native-elements';

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
    <ScrollView>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Cart</Text>
        
        {cart.length === 0 ? (
          <Text>Your cart is empty.</Text>
        ) : (
          <>
            {cart.map(item => (
              <ListItem key={item.id} bottomDivider>
                <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
                <ListItem.Content>
                  <ListItem.Title>{item.title}</ListItem.Title>
                  <ListItem.Subtitle>Price: ${item.price}</ListItem.Subtitle>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                    <Button
                      title="-"
                      type="outline"
                      onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      containerStyle={{ marginRight: 10 }}
                    />
                    <Text>Quantity: {item.quantity}</Text>
                    <Button
                      title="+"
                      type="outline"
                      onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
                      containerStyle={{ marginLeft: 10 }}
                    />
                  </View>
                  <Button
                    title="Remove"
                    type="clear"
                    onPress={() => handleRemoveItem(item.id)}
                    titleStyle={{ color: '#fb5b5a', fontSize: 14 }}
                  />
                </ListItem.Content>
              </ListItem>
            ))}
            
            <View style={{ marginTop: 20, alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total: ${getTotalPrice()}</Text>
              <Button
                title="Clear Cart"
                onPress={handleClearCart}
                disabled={cart.length === 0}
                buttonStyle={{ backgroundColor: '#fb5b5a', marginTop: 10 }}
              />
              <Button
                title="Go to Payment"
                onPress={() => {}}
                buttonStyle={{ backgroundColor: '#007bff', marginTop: 10 }}
              />
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default Cart;