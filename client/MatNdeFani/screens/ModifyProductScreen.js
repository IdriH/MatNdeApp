// screens/ModifyProductScreen.js
import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Button, ImageBackground,Alert } from 'react-native';
import styles from '../styles/ModfiyProductScreenStyles';
import { useState } from 'react';
import { updateProduct } from '../services/api';
import { useProducts } from '../state/ProductsContext';

const ModifyProductScreen = ({ route, navigation }) => {
  

  const [name, setName] = useState(route.params.name);
  const [category, setCategory] = useState(route.params.category);
  const [distributor, setDistributor] = useState(route.params.distributor);
  const [manufacturer, setManufacturer] = useState(route.params.manufacturer);
  const [origin, setOrigin] = useState(route.params.origin);
  const [priceBought, setPriceBought] = useState(route.params.priceBought.toString());
  const [priceSold, setPriceSold] = useState(route.params.priceSold.toString());
  const [quantity, setQuantity] = useState(route.params.quantity.toString());

  const {updateProductsOptimistic} = useProducts();

  const handleSaveChanges = async () => {
    const updatedProduct = {
      id: route.params.id, // Ensure this is correctly passed
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
      const result = await updateProduct(route.params.id, updatedProduct);
      if (result) {
        updateProductsOptimistic({...updatedProduct, _id: route.params.id}); // Make sure to pass all needed fields
        Alert.alert('Success', 'Product updated successfully', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        throw new Error("Update was not successful");
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update product: ' + error.message);
    }
  };
  

  return (
            <View style={styles.container}>
                <Text style={styles.header}>Produkti:</Text>
                <ScrollView style={styles.scrollContainer}>
                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput style={styles.input} value={name}  onChangeText={setName}  />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Category</Text>
                        <TextInput style={styles.input} value={category} onChangeText={setCategory} />
                    </View>
                        
                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Distributor</Text>
                        <TextInput style={styles.input} value={distributor} onChangeText={setDistributor} />
                    </View>
                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Manufacturer</Text>
                        <TextInput style={styles.input} value={manufacturer} onChangeText={setManufacturer}  />
                    </View>
                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Origin</Text>
                        <TextInput style={styles.input} value={origin} onChangeText={setOrigin}/>
                    </View>

                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Price Bought</Text>
                        <TextInput style={styles.input} value={priceBought} onChangeText={setPriceBought}/>
                    </View>

                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Price Sold</Text>
                        <TextInput style={styles.input} value={priceSold} onChangeText={setPriceSold} />
                    </View>
                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Quantity</Text>
                        <TextInput style={styles.input} value={quantity} onChangeText={setQuantity}/>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button title="Save Changes" onPress={ handleSaveChanges } />
                    </View>
                </ScrollView>
          </View>
 
  );
};



export default ModifyProductScreen;