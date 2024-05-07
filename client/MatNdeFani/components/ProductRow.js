// components/Product.js
import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import styles from '../styles/ProductRowStyles';

import { useUser } from '../state/UserContext';

const ProductRow = ({ navigation,id,name,category,distributor,manufacturer, origin,priceBought,priceSold,quantity ,
  onAdd, 
  onRemove,}) => {

    const {user} = useUser();

  return (
    <View style={styles.container}>
       
       <View style={styles.productDetails}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.detail}>{category}</Text>
        <Text style={styles.detail}>Distributor: {distributor}</Text>
        <Text style={styles.detail}>Prodhuesi : {manufacturer}</Text>
        <Text style={styles.origin}>Origjina:{origin}</Text>
      </View>
      <View style={styles.priceAndQuantity}>
        {(user.role ==='admin')?(
        <Text style={styles.priceBought}>Blihet:{priceBought} lek</Text>
        ):(null)
        }
        {(user.role ==='admin')?(
        <Text style={styles.quantity}>Sasia:{quantity}</Text>
        ):(null)
        }
        <Text style={styles.price}>Cmimi:{priceSold} lek</Text>
        
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
