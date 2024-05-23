// screens/ProductsScreen.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Animated,ImageBackground } from 'react-native';
import ProductRow from '../components/ProductRow';
import styles from '../styles/ProductsScreenStyles';
import { useFocusEffect } from '@react-navigation/native';
import { useUser } from '../state/UserContext';
import { useOrder } from '../state/OrderContext';
import { useProducts } from '../state/ProductsContext';


const ProductsScreen = ({ navigation }) => {
  const { user } = useUser();
  const { products ,setProducts,updateProducts} = useProducts(); 
  
  const [searchQuery, setSearchQuery] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [pendingOrder, setPendingOrder] = useState({
   
    professionalID: user?.id || 1, // Dynamically setting professionalID based on user context
    products: [],
    status: 'pending', 
    createdAt: new Date().toISOString(), 
});

  
  // Refetch products when the screen is focused
  useFocusEffect(
    useCallback(() => {
      const fetchAndUpdateProducts = async () => {
        await updateProducts();
      };

      fetchAndUpdateProducts();
      
    }, [])
  );
  
  /*
  useFocusEffect(
    useCallback(() => {
      const fetchProductsDirectly = async () => {
        try {
          const productsFromApi = await fetchProducts(); // Assuming fetchProducts directly fetches products from the API
          console.log('Directly fetched products');
          setProducts(productsFromApi); // Update the products in the local state of the ProductsScreen
        } catch (error) {
          console.error('Failed to fetch products:', error);
          // Handle the error as needed
        }
      };
  
      fetchProductsDirectly();
      console.log("testttttttttttttttttttttttt")
    }, [])
  );
  */
  
  
  const popAnimation = useRef(new Animated.Value(1)).current;

  const triggerAnimation = () => {
    Animated.sequence([
      Animated.timing(popAnimation, { toValue: 1.2, duration: 100, useNativeDriver: true }),
      Animated.timing(popAnimation, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const addToOrder = (productName, productInfo) => {
    setPendingOrder((currentOrder) => {
      // Check if the product already exists in the order
      const productIndex = currentOrder.products.findIndex(p => p.name === productName);
      let newProducts;
  
      if (productIndex >= 0) {
        // Product exists, update the quantity
        newProducts = currentOrder.products.map((p, index) => {
          if (index === productIndex) {
            return { ...p, quantity: p.quantity + 1 }; // Increment quantity
          }
          
          return p;
        });
      } else {
        // Product does not exist, add it with quantity of 1
        newProducts = [...currentOrder.products, { ...productInfo, quantity: 1 }];
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
  ).sort((a, b) => a.name.localeCompare(b.name));

  const incrementTotalCount = () => {
    setTotalCount((prevCount) => prevCount + 1);
    triggerAnimation();
  };

  const decrementTotalCount = () => {
    setTotalCount((prevCount) => Math.max(prevCount - 1, 0));
    triggerAnimation();
  };
  const navigateToOrderScreen = () => {
    navigation.navigate('Order', { 
        order: pendingOrder,  
        resetOrder: () => {
            setTotalCount(0);
            setPendingOrder({
                professionalID: user?.id || 1, // Reset to initial state 
                products: [],
                status: 'pending',
                createdAt: new Date().toISOString(),
            });
        }
    });
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
        id = {item._id}
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

  
  
  const backgroundImage = require('../assets/ProductScreen.jpeg');

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Produkte</Text>
        <TextInput
          placeholder="Kerko..."
          style={styles.searchBox}
          value={searchQuery}
          onChangeText={setSearchQuery} 
        />
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item._id}
          renderItem={renderProduct}
         
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
