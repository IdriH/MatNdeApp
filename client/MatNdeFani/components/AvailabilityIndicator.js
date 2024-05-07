import React, { useState , useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { toggleProfessionalStatus ,fetchProfessional } from '../services/api';

const AvailabilityIndicator = ({professionalID}) => {
  const [isAvailable, setIsAvailable] = useState(false); 

  
  const loadInitialStatus = async () => {
    try {
        const response = await fetchProfessional(professionalID);
        if (response ) {
            const status = response.available; 
            setIsAvailable(status);
        } else {
            throw new Error('Invalid response structure'); 
        }
    } catch (error) {
        console.error('Error loading initial status:', error);
    }
};
loadInitialStatus();

   // Function to toggle availability and update on the server
   const toggleAvailability = async () => {
    try {
      const result = await toggleProfessionalStatus(professionalID);
      if (result.data && result.data.available !== undefined) {
        setIsAvailable(result.data.available); // Update based on the server's response
      }
    } catch (error) {
      console.error('Failed to toggle availability:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isAvailable ? styles.available : styles.unavailable]}
        onPress={toggleAvailability}
      >
        <Text style={styles.buttonText}>Disponibiliteti</Text>
      </TouchableOpacity>
      <View style={[styles.statusIndicator, isAvailable ? styles.available : styles.unavailable]} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15, 
      backgroundColor: '#ffffff', 
      borderRadius: 25, 
      shadowColor: "#000", // Adding shadow for depth
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5, // Elevation for Android to create shadow effect
    },
    button: {
      paddingVertical: 10,
      paddingHorizontal: 20, 
      borderRadius: 20, 
      backgroundColor: '#007BFF', 
      marginRight: 20, 
    },
    statusIndicator: {
      width: 24, 
      height: 24, 
      borderRadius: 12, 
    },
    available: {
      backgroundColor: 'green', 
    },
    unavailable: {
      backgroundColor: 'darkred', 
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold', 
    },
  });
  

export default AvailabilityIndicator;
