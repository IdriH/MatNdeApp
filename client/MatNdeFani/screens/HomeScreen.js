import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import styles from '../styles/HomeScreenStyles'; 

import AvailabilityIndicator from '../components/AvailabilityIndicator';
import {logout ,checkCurrentSession} from '../services/api.js'
import { useUser } from '../state/UserContext';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';


// Add navigation prop to the component's parameters
const HomeScreen = ({ navigation}) => {
 

  const { user, isLoggedIn, setIsLoggedIn,  setUser} = useUser();
  
  useFocusEffect(
    React.useCallback(() => {
      const verifySession = async () => {
        try {
          // Verify session only if user is logged in
          if (isLoggedIn) {
            const userData = await checkCurrentSession();
            if (userData) {
              if (user.username !== userData.username) {
                setUser(userData);
              }
            } else {
              setIsLoggedIn(false);
              setUser({});
            }
          }
        } catch (error) {
          console.error('Failed to verify session:', error);
          setIsLoggedIn(false);
          setUser({});
        }
      };
  
      verifySession();
    }, [isLoggedIn])
  );
  

  if (isLoggedIn) {
  console.log('Logged in as:', user.username);
  } else {
  console.log('Not logged in');
  }

  const handleLogout = async () => {
    try {
      // Call the logout API
      const response = await logout();
      console.log('Logout successful:', response);
      // Update the state to reflect that the user is no longer logged in
      setIsLoggedIn(false);
      setUser({}); // Reset user state
      Alert.alert('Success', 'Logged out successfully!');
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', error.message || 'Logout failed');
    }
  };

 
  
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
          <TouchableOpacity style={styles.loginButton}  onPress={() => {
          if (isLoggedIn) {
            handleLogout();
          } else {
            navigation.navigate('Login');
          }
        }}>
            <Text style={styles.loginButtonText}>{isLoggedIn ? 'Dil' : 'Hyr'}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
};

export default HomeScreen;
