// screens/ProductsScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Animated,ImageBackground } from 'react-native';
import ProductRow from '../components/ProductRow';
import styles from '../styles/ProductsScreenStyles';
import { useUser } from '../state/UserContext';
import { useOrder } from '../state/OrderContext';
import { useProducts } from '../state/ProductsContext';

const ProductsScreen = ({ navigation }) => {
  const { user } = useUser();
  const { products } = useProducts(); // Assuming useProducts returns an object with a products array
  const [searchQuery, setSearchQuery] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [pendingOrder, setPendingOrder] = useState({
    orderID: 1, // This should be dynamically generated or retrieved in a real application
    professionalID: user?.id || 1, // Example of setting professionalID based on user context
    products: [],
    accepted: false,
    createdAt: new Date().toISOString(),
    status: 'pending',
  });
  const popAnimation = useRef(new Animated.Value(1)).current;

  const triggerAnimation = () => {
    Animated.sequence([
      Animated.timing(popAnimation, { toValue: 1.2, duration: 100, useNativeDriver: true }),
      Animated.timing(popAnimation, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const addToOrder = (productName, productInfo) => {
    setPendingOrder((currentOrder) => {
      const productIndex = currentOrder.products.findIndex(p => p.name === productName);
      let newProducts = [...currentOrder.products];

      if (productIndex >= 0) {
        newProducts[productIndex] = { ...newProducts[productIndex], quantity: newProducts[productIndex].quantity + 1 };
      } else {
        newProducts.push({ name: productName, quantity: 1, ...productInfo });
      }

      return { ...currentOrder, products: newProducts };
    });
  };

  const removeFromOrder = (productName) => {
    setPendingOrder((currentOrder) => {
      const productIndex = currentOrder.products.findIndex(p => p.name === productName);
      if (productIndex < 0) return currentOrder;

      let newProducts = [...currentOrder.products];
      if (newProducts[productIndex].quantity > 1) {
        newProducts[productIndex] = { ...newProducts[productIndex], quantity: newProducts[productIndex].quantity - 1 };
      } else {
        newProducts.splice(productIndex, 1);
      }

      return { ...currentOrder, products: newProducts };
    });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const incrementTotalCount = () => {
    setTotalCount((prevCount) => prevCount + 1);
    triggerAnimation();
  };

  const decrementTotalCount = () => {
    setTotalCount((prevCount) => Math.max(prevCount - 1, 0));
    triggerAnimation();
  };

  const navigateToOrderScreen = () => {
    navigation.navigate('Order', { order: pendingOrder });
  };

  const renderProduct = ({ item }) => {
    const handleAdd = () => {
      incrementTotalCount();
      addToOrder(item.name, item);
    };

    const handleRemove = () => {
      decrementTotalCount();
      removeFromOrder(item.name);
    };

    return (
      <ProductRow
        id = {item.id}
        name={item.name}
        category={item.category}
        distributor={item.distributor}
        manufacturer={item.manufacturer}
        origin={item.origin}
        priceBought={item.priceBought}
        priceSold={item.priceSold}
        quantity={item.quantity}
        navigation={navigation}
        onAdd={handleAdd}
        onRemove={handleRemove}
      />
    );
  };

  
  // Replace with your actual background image
  const backgroundImage = require('../assets/homepage.jpg');

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Produkte</Text>
        <TextInput
          placeholder="Search for products..."
          style={styles.searchBox}
          value={searchQuery}
          onChangeText={setSearchQuery} // Update searchQuery state on text change
        />
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProduct}
          // The rest of your props
        />
        
        {
          (user.role ==='admin') ? (
            
            <TouchableOpacity style={styles.addButton} onPress={() => {/* handle add product */}}>
              <Text style={styles.addButtonText} onPress = {() => navigation.navigate('AddProduct')}>+ Add Product</Text>
            </TouchableOpacity>
          ) : (user.role === 'professional') ? (
            
            <Animated.View 
            style={[styles.orderCounter, { transform: [{ scale: popAnimation }] }]} // Apply the animated scale here
          >
            <TouchableOpacity onPress={navigateToOrderScreen}>
              <Text style={styles.orderCounterText}>{totalCount}</Text>
            </TouchableOpacity>
          </Animated.View>
          ) : null
        }

        
        
      
      </View>
    </ImageBackground>
  );
};



export default ProductsScreen;
