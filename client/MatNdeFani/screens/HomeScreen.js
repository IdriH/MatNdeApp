import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import styles from '../styles/HomeScreenStyles'; 

import AvailabilityIndicator from '../components/AvailabilityIndicator';

import { useUser } from '../state/UserContext';


// Add navigation prop to the component's parameters
const HomeScreen = ({ navigation}) => {
  const {user} = useUser();
 
  
  const backgroundImage = require('../assets/homepage.jpg');
  
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundContainer}>
        <View style={styles.overlayContainer}>
          <Text style={styles.header}>Materiale Ndertimi Fani</Text>
          {/* Add onPress method to navigate to ProductsScreen */}
          <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('Products')}>
            <Text style={styles.sectionTitle}>Produkte</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('Professionals')}>
            <Text style={styles.sectionTitle}>Profesionist</Text>
          </TouchableOpacity>
          {(user.role ==='admin' || user.role === 'professional') && (
            <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('Orders') }>
              <Text style={styles.sectionTitle}>Orders</Text>
            </TouchableOpacity>
          )}
          {(user.role ==='professional') && (
            <View style={styles.availabilityContainer}>
              <AvailabilityIndicator professionalID = {user.id}/>
            </View>
          )}
          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginButtonText}>Hyr</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
};

export default HomeScreen;
