import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const OrderScreen = ({ route, navigation }) => {
  const [order, setOrder] = useState(route.params.order);

  const incrementQuantity = (index) => {
    const newOrder = { ...order };
    newOrder.products[index].quantity += 1;
    setOrder(newOrder);
  };

  const decrementQuantity = (index) => {
    const newOrder = { ...order };
    if (newOrder.products[index].quantity > 1) {
      newOrder.products[index].quantity -= 1;
    } else {
      // Optionally handle the case where quantity is 1 and needs to be decreased
      // For example, you might want to remove the product from the order
       newOrder.products.splice(index, 1);
    }
    setOrder(newOrder);
  };
  const renderOrderItem = ({ item, index }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderTitle}>{item.name} x {item.quantity}</Text>
      <View style={styles.quantityControls}>
        <TouchableOpacity style={styles.quantityButton} onPress={() => incrementQuantity(index)}>
          <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quantityButton} onPress={() => decrementQuantity(index)}>
          <Text style={styles.quantityText}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Convert the createdAt string to a Date object and format it
  const orderDate = new Date(order.createdAt).toLocaleString();

  
  return (
    <View style={styles.container}>
      <View style={styles.orderContainer}>
        <FlatList
          data={order.products}
          renderItem={renderOrderItem}
          keyExtractor={(item, index) => `product-${index}`}
        />
        
        {/* Confirm Button */}
        <TouchableOpacity style={styles.confirmButton} onPress={() => {/* Handle confirm action */}}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
        {/* Cancel Button */}
        <TouchableOpacity style={styles.cancelButton} onPress={() => {/* Handle cancel action */}}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  orderContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  orderTitle: {
    fontSize: 16,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    marginHorizontal: 5,
    backgroundColor: '#ddd',
    padding: 5,
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 16,
    color: '#000',
  },
  confirmButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderScreen;

