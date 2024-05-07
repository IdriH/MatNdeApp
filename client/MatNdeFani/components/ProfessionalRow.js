import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image } from 'react-native';
import styles from '../styles/ProfessionalRowStyles';

import API_BASE_URL from '../services/api'





const ProfessionalRow = ({navigation,professionalID ,fullName, category, available, reviewScore,profilePicture}) => {
    

  const uri =  `${API_BASE_URL}/${profilePicture}`
  
    const imageUri = profilePicture ? { uri: `${API_BASE_URL}/${profilePicture}` } : require('../assets/AnonimProfPic.jpg');

    
return (
  <TouchableOpacity onPress= {() => navigation.navigate('ViewProfessional',{professionalID})} style={styles.containerTouchable}>
    
        <Image source={imageUri} style={styles.profileImage} />
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
