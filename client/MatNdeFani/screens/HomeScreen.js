import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import styles from '../styles/HomeScreenStyles'; 

const HomeScreen = () => {
    // Require the image from your assets directory
    const backgroundImage = require('../assets/homepage.jpg');
  
    return (
     
      <ImageBackground source={backgroundImage} style={styles.backgroundContainer}>
        <View style={styles.overlayContainer}>
          <Text style={styles.header}>Materiale Ndertimi Fani</Text>
          <TouchableOpacity style={styles.section}>
            <Text style={styles.sectionTitle}>Produkte</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.section}>
            <Text style={styles.sectionTitle}>Profesionist</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={() => {/* handle the press */}}>
            <Text style={styles.loginButtonText}>Hyr</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      
    );
  };

export default HomeScreen;