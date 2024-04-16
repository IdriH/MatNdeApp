import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Button, Alert } from 'react-native';
import styles from '../styles/ModfiyProductScreenStyles';
import { addProduct } from '../services/api'; // Import the API method
import { useProducts } from '../state/ProductsContext';

const AddProductScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [distributor, setDistributor] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [origin, setOrigin] = useState('');
  const [priceBought, setPriceBought] = useState('');
  const [priceSold, setPriceSold] = useState('');
  const [quantity, setQuantity] = useState('');

  const { addProductOptimistic } = useProducts();

  const handleSaveChanges = async () => {
    const newProduct = {
      name,
      category,
      distributor,
      manufacturer,
      origin,
      priceBought,
      priceSold,
      quantity,
    };

    try {
        const result = await addProduct(newProduct);
        Alert.alert('Success', 'Product added successfully', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),  // Navigating back on success
          }
         
        ]);
        addProductOptimistic(result.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to add product: ' + error.message);
      console.error('TEST2', error);
    }
  };

  return (
    <View style={styles.container}>
                <Text style={styles.header}>Produkti:</Text>
                <ScrollView style={styles.scrollContainer}>
                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput style={styles.input} value={name} onChangeText={setName} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Category</Text>
                        <TextInput style={styles.input} value={category}  onChangeText={setCategory}  />
                    </View>
                        
                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Distributor</Text>
                        <TextInput style={styles.input} value={distributor}  onChangeText={setDistributor}  />
                    </View>
                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Manufacturer</Text>
                        <TextInput style={styles.input} value={manufacturer} onChangeText={setManufacturer}  />
                    </View>
                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Origin</Text>
                        <TextInput style={styles.input} value={origin} onChangeText={setOrigin} />
                    </View>

                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Price Bought</Text>
                        <TextInput style={styles.input} value={priceBought}  onChangeText={setPriceBought}/>
                    </View>

                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Price Sold</Text>
                        <TextInput style={styles.input} value={priceSold} onChangeText={setPriceSold}  />
                    </View>
                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Quantity</Text>
                        <TextInput style={styles.input} value={quantity} onChangeText={setQuantity} />
                    </View>

                    <View style={styles.buttonContainer}>
                    <Button title="Save Changes" onPress={handleSaveChanges} />

                    </View>
                </ScrollView>
          </View>
 
  );
};



export default AddProductScreen;