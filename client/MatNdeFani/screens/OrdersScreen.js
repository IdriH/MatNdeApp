import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useOrder } from '../state/OrderContext';
import { useUser } from '../state/UserContext';
import { fetchOrdersForProfessional } from '../services/api';
import { useState,useEffect } from 'react';
//import styles from '../styles/OrdersScreenStyles';
// Dummy data for orders

const OrdersScreen = () => {

  const { user } = useUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
       
          const fetchedOrders = await fetchOrdersForProfessional(user.id);
          setOrders(fetchedOrders);
        
      } catch (error) {
        console.error('Error loading orders:', error);
        // Handle the error appropriately
      }
    };

    loadOrders();
  }, []);

  const renderProduct = ({ item }) => (
    <View style={styles.productItem}>
      <Text style={styles.productName}>{item.name} x {item.quantity} x {item.price}$</Text>
    </View>
  );

  //const calculateTotal = (products) => products.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

  const renderOrder = ({ item }) => {
    const formattedDate = new Date(item.createdAt).toLocaleString(); // Convert timestamp to readable format
    return (
      <View style={styles.orderItem}>
        <Text style={styles.orderProfName}>Professional ID: {item.professionalID.toString()}</Text>
        <FlatList
          data={item.products}
          renderItem={renderProduct}
          keyExtractor={(item) => item._id.toString()}
        />
        {/*<Text style={styles.totalText}>Total: ${calculateTotal(item.products)}</Text>*/}
        <Text style={styles.statusText}>Status: {item.status}</Text> 
        <Text style={styles.timestampText}>Date: {formattedDate}</Text>
        {(user.role === 'admin')?(
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.acceptButton} onPress={() => {/* Handle accept action here */}}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeButton} onPress={() => {/* Handle remove action here */}}>
            <Text style={styles.buttonText}>Remove</Text>
          </TouchableOpacity>
        </View>):(null)
        }
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders</Text>
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item._id.toString()}
      />
    </View>
  );
};

// Add the styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  orderItem: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  productItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 5,
    marginBottom: 5,
  },
  productName: {
    fontSize: 16,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  statusText: {
    fontSize: 16,
    marginTop: 5,
  },
  timestampText: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  acceptButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf : 'center',
  },
  orderProfName: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default OrdersScreen;