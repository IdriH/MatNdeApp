// screens/ModifyProductScreen.js
import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Button, ImageBackground } from 'react-native';
import styles from '../styles/ModfiyProductScreenStyles';

import { useState } from 'react';

const AddProductScreen = () => {
  
   

    // Local state for new product details
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [distributor, setDistributor] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [origin, setOrigin] = useState('');
  const [priceBought, setPriceBought] = useState('');
  const [priceSold, setPriceSold] = useState('');
  const [quantity, setQuantity] = useState('');

  
  const handleSaveChanges = () => {
    
    const newProduct = {
      id: 111,
      name : name,
      category : category,
      distributor : distributor,
      manufacturer : manufacturer,
      origin : origin,
      priceBought: parseFloat(priceBought),
      priceSold: parseFloat(priceSold),
      quantity: parseInt(quantity, 10),
    };
    console.log(newProduct)
    console.log('TEST2')
    //add product to backend
}
 
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