// components/Product.js
import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import styles from '../styles/ProductRowStyles';

import { useUser } from '../state/UserContext';

const ProductRow = ({ navigation,id,name,category,distributor,manufacturer, origin,priceBought,priceSold,quantity ,
  onAdd, // Function to handle adding the product to the order
  onRemove,}) => {

    const {user} = useUser();

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
        {(user.role ==='admin')?(
        <Text style={styles.priceBought}>Blihet:{priceBought}Є</Text>
        ):(null)
        }
        {(user.role ==='admin')?(
        <Text style={styles.quantity}>Sasia:{quantity}</Text>
        ):(null)
        }
        <Text style={styles.price}>Cmimi:{priceSold}Є</Text>
        
      </View>
      { 
      (user.role === 'admin') ?
      (<TouchableOpacity style={styles.modifyButton} onPress={() => navigation.navigate('ModifyProduct', { 
          // Optional: pass parameters you might need in ModifyProductScreen
          id,name, category, distributor, manufacturer, origin, priceBought, priceSold, quantity
        })}>
        <Text style={styles.modifyButtonText}>Modify</Text>
      </TouchableOpacity>) : (user.role ==='professional') ? (<View style={styles.actionButtons}>
        
        <TouchableOpacity onPress={onAdd} style={styles.actionButton}>
          <Text style={styles.actionButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onRemove} style={styles.actionButton}>
          <Text style={styles.actionButtonText}>-</Text>
      </TouchableOpacity>
      </View>): (null)
      }
      

    </View>
  );
};


export default ProductRow;
