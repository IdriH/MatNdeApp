import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView,Alert,useCallback } from 'react-native';
import { useOrder } from '../state/OrderContext';
import { useUser } from '../state/UserContext';
import { fetchOrdersForProfessional,fetchAllOrders,acceptOrder,declineOrder,deleteOrder } from '../services/api';
import { useState,useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
//import styles from '../styles/OrdersScreenStyles';
// Dummy data for orders

const OrdersScreen = () => {

  const { user } = useUser();
  const [orders, setOrders] = useState([]);

  
  useEffect(() => {
    const loadOrders = async () => {
      try {
       if(user.role === 'admin'){
        const fetchedOrders = await fetchAllOrders()
        setOrders(fetchedOrders);
       }else {
         const fetchedOrders = await fetchOrdersForProfessional(user.id);
         setOrders(fetchedOrders);
        }

        
      } catch (error) {
        console.error('Error loading orders:', error);
        // Handle the error appropriately
      }
    };

    loadOrders();
  }, []);

 


  

  const renderProduct = ({ item }) => (
    <View style={styles.productItem}>
      <Text style={styles.productName}>{item.name} x {item.quantity} x {item.price}   $</Text>
    </View>
  );
  /*
  const handleAccept = async (orderId) => {
    try {
        const result = await acceptOrder(orderId);
        
        console.log(JSON.stringify(result) + "TTTTTTTTTTTT")
        // Optimistically update the order status in the local state
        setOrders(currentOrders =>
          currentOrders.map(order =>
              order._id === orderId ? { ...order, status: 'accepted' } : order
          )
        
      );

        // Update local state or trigger a refresh
        Alert.alert('Success', 'Order accepted successfully');
    } catch (error) {
        Alert.alert('Error', error.message);
    }
};
*/
const handleAccept = async (orderId) => {
  try {
      const result = await acceptOrder(orderId);
      // Update the local state based on the successful backend response
      setOrders(currentOrders =>
          currentOrders.map(order =>
              order._id === orderId ? { ...order, status: 'accepted' } : order
          )
      );
      Alert.alert('Success', 'Order accepted successfully');
  } catch (error) {
      console.error('Error accepting order:', error);
      // Display the error message extracted from the caught error
      Alert.alert('Error', error.message);
  }
};


const handleDecline = async (orderId) => {
    try {
        const result = await declineOrder(orderId);
        // Optimistically update the order status in the local state
        setOrders(currentOrders =>
          currentOrders.map(order =>
              order._id === orderId ? { ...order, status: 'declined' } : order
          )
      );
        // Update local state or trigger a refresh
        Alert.alert('Success', 'Order declined successfully');
    } catch (error) {
        Alert.alert('Error', error.message);
    }
};  

const handleDelete = async (orderId) => {
  try {
      const result = await deleteOrder(orderId);
      setOrders(currentOrders =>
          currentOrders.filter(order => order._id !== orderId)
      );
      Alert.alert('Success', 'Order deleted successfully');
  } catch (error) {
      Alert.alert('Error', 'Could not delete order');
  }
};
  //const calculateTotal = (products) => products.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

  const renderOrder = ({ item }) => {
    const formattedDate = new Date(item.createdAt).toLocaleString(); // Convert timestamp to readable format
    const isAcceptedOrDeclined = item.status === 'accepted' || item.status === 'declined';
    const total = item.products.reduce((acc, product) => acc + (product.quantity * product.price), 0);
    
    return (
      <View style={styles.orderItem}>
        <Text style={styles.orderProfName}>Professional: {item.professionalName}</Text>
        <FlatList
          data={item.products}
          renderItem={renderProduct}
          keyExtractor={(item) => item._id.toString()}
        />
        {/*<Text style={styles.totalText}>Total: ${calculateTotal(item.products)}</Text>*/}
        <Text style={styles.totalText}>Total: ${total}</Text>
        <Text style={styles.statusText}>Status: {item.status}</Text> 
        <Text style={styles.timestampText}>Date: {formattedDate}</Text>
        {(user.role === 'admin') && !isAcceptedOrDeclined && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.acceptButton} onPress={() => handleAccept(item._id)}>
                        <Text style={styles.buttonText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.declineButton} onPress={() => handleDecline(item._id)}>
                        <Text style={styles.buttonText}>Decline</Text>
                    </TouchableOpacity>
                </View>
            )}
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item._id)}>
                            <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
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
      borderWidth: 1,
      borderColor: '#ccc',
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
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 5,
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
  declineButton: {
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 5,
  },
  deleteButton: {
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
      alignSelf: 'center',
  },
  orderProfName: {
      fontSize: 16,
      marginBottom: 5,
  },
});

export default OrdersScreen;