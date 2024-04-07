import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image } from 'react-native';
import styles from '../styles/ProfessionalRowStyles';






// Assuming 'category' will be added to your data model
const ProfessionalRow = ({navigation, fullName, category, available, reviewScore }) => {
    const img = require('../assets/AnonimProfPic.jpg');

    
return (
  <TouchableOpacity onPress= {() => navigation.navigate('ViewProfessional')} style={styles.containerTouchable}>
    
        <Image source={img} style={styles.profileImage} />
      <View style={styles.professionalDetails}>
        <Text style={styles.name}>{fullName}</Text>
        <Text style={styles.detail}>Category: {category}</Text>
        <Text style={styles.detail}>{available ? 'Available' : 'Unavailable'}</Text>
      </View>
      <View style={styles.reviewScoreContainer}>
        <Text style={styles.reviewScore}>Rating: {reviewScore}</Text>
      </View>
      
    
  </TouchableOpacity>
  );
};

export default ProfessionalRow;
