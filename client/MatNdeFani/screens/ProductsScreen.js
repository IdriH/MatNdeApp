// screens/ProductsScreen.js
import React from 'react';
import { View, Text, TextInput, FlatList, ImageBackground, StyleSheet , TouchableOpacity} from 'react-native';
import ProductRow from '../components/ProductRow'
import styles from '../styles/ProductsScreenStyles';


const dummyProductsData = [
  {
    id: '1',
    name: 'Hammer',
    category: 'Tools',
    distributor: 'Global Tools',
    manufacturer: 'Hammers Inc.',
    origin: 'USA',
    priceBought: 19.99,
    priceSold: 29.99,
    quantity: 30,
  },
  {
    id: '2',
    name: 'Drill',
    category: 'Tools',
    distributor: 'Global Tools',
    manufacturer: 'Drills Ltd.',
    origin: 'Germany',
    priceBought: 60.00,
    priceSold: 89.99,
    quantity: 20,
  },
  {
    id: '3',
    name: 'Screwdriver Set',
    category: 'Accessories',
    distributor: 'Fix-It',
    manufacturer: 'ScrewThis Company',
    origin: 'China',
    priceBought: 10.00,
    priceSold: 19.99,
    quantity: 15,
  },
  {
    id: '4',
    name: 'Circular Saw',
    category: 'Tools',
    distributor: 'Cutting Edge',
    manufacturer: 'SawMakers',
    origin: 'USA',
    priceBought: 75.00,
    priceSold: 129.99,
    quantity: 10,
  },
  {
    id: '5',
    name: 'Wrench Set',
    category: 'Tools',
    distributor: 'Tool World',
    manufacturer: 'Spanners & Co.',
    origin: 'UK',
    priceBought: 20.00,
    priceSold: 34.99,
    quantity: 25,
  },
  {
    id: '6',
    name: 'Pliers',
    category: 'Tools',
    distributor: 'Handy Helpers',
    manufacturer: 'GripIt',
    origin: 'USA',
    priceBought: 5.00,
    priceSold: 9.99,
    quantity: 50,
  },
  {
    id: '7',
    name: 'Laser Level',
    category: 'Accessories',
    distributor: 'Level Best',
    manufacturer: 'LaserLine',
    origin: 'Sweden',
    priceBought: 45.00,
    priceSold: 69.99,
    quantity: 20,
  },
  // ... potentially more products
];



const ProductsScreen = () => {

  const renderProduct = ({ item }) => (
    <ProductRow
      name={item.name}
      category={item.category}
      distributor={item.distributor}
      manufacturer={item.manufacturer}
      origin={item.origin}
      priceBought={item.priceBought}
      priceSold={item.priceSold}
      quantity={item.quantity}
    />
  );
  
  // Replace with your actual background image
  const backgroundImage = require('../assets/homepage.jpg');

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Produkte</Text>
        <TextInput placeholder="Search for products..." style={styles.searchBox} />
        <FlatList
          data={dummyProductsData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProduct}
          // The rest of your props
        />
        <TouchableOpacity style={styles.addButton} onPress={() => {/* handle add product */}}>
          <Text style={styles.addButtonText}>+ Add Product</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};



export default ProductsScreen;
