// screens/ModifyProductScreen.js
import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Button, ImageBackground } from 'react-native';
import styles from '../styles/ModfiyProductScreenStyles';

const ModifyProductScreen = () => {
  // You will eventually retrieve the current product details from the route params or global state
  // const { currentProduct } = route.params;

  return (
            <View style={styles.container}>
                <Text style={styles.header}>Produkti:</Text>
                <ScrollView style={styles.scrollContainer}>
                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput style={styles.input} value={'Current Name'} /* onChangeText={...} */ />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Category</Text>
                        <TextInput style={styles.input} value={'Current Category'} /* onChangeText={...} */ />
                    </View>
                        
                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Distributor</Text>
                        <TextInput style={styles.input} value={'Current Distributor'} /* onChangeText={...} */ />
                    </View>
                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Manufacturer</Text>
                        <TextInput style={styles.input} value={'Manufacturer'} /* onChangeText={...} */ />
                    </View>
                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Origin</Text>
                        <TextInput style={styles.input} value={'Current Origin'} /* onChangeText={...} */ />
                    </View>

                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Price Bought</Text>
                        <TextInput style={styles.input} value={'Price Bought'} /* onChangeText={...} */ />
                    </View>

                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Price Sold</Text>
                        <TextInput style={styles.input} value={'Current Price Sold'} /* onChangeText={...} */ />
                    </View>
                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Quantity</Text>
                        <TextInput style={styles.input} value={'Current Quantity'} /* onChangeText={...} */ />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button title="Save Changes" onPress={() => { /* Handle save action */ }} />
                    </View>
                </ScrollView>
          </View>
 
  );
};



export default ModifyProductScreen;