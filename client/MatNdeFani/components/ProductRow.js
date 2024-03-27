// components/Product.js
import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import styles from '../styles/ProductRowStyles';

const ProductRow = ({ name,category,distributor,manufacturer, origin,priceBought,priceSold,quantity }) => {
  return (
    <View style={styles.container}>
       
       <View style={styles.productDetails}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.detail}>{category}</Text>
        <Text style={styles.detail}>{distributor}</Text>
        <Text style={styles.detail}>{manufacturer}</Text>
        <Text style={styles.origin}>Origin:{origin}</Text>
      </View>
      <View style={styles.priceAndQuantity}>
        <Text styles = {styles.priceBought}>Blihet:{priceBought}Є</Text>
        <Text style={styles.price}>Cmimi:{priceSold}Є</Text>
        <Text style={styles.quantity}>Sasia:{quantity}</Text>
      </View>
      <TouchableOpacity style={styles.modifyButton}>
        <Text style={styles.modifyButtonText}>Modify</Text>
      </TouchableOpacity>

    </View>
  );
};


export default ProductRow;
