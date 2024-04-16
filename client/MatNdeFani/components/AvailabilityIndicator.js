import React, { useState , useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { toggleProfessionalStatus ,fetchProfessional } from '../services/api';

const AvailabilityIndicator = ({professionalID}) => {
  const [isAvailable, setIsAvailable] = useState(false); // Initial availability status

  
  const loadInitialStatus = async () => {
    try {
        const response = await fetchProfessional(professionalID);
        if (response ) {
            const status = response.available; // Ensure that 'data' and 'available' are correctly accessed
            setIsAvailable(status);
        } else {
            throw new Error('Invalid response structure'); // Handles cases where the data might not be as expected
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
        <Text style={styles.buttonText}>Toggle Availability</Text>
      </TouchableOpacity>
      <View style={[styles.statusIndicator, isAvailable ? styles.available : styles.unavailable]} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15, // Increase padding for more spacing around the button and status indicator
      backgroundColor: '#ffffff', // Optional: Add a background color to the container for better visibility
      borderRadius: 25, // Soften the corners of the container
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
      paddingHorizontal: 20, // Increase padding for a wider button
      borderRadius: 20, // Rounded corners for the button
      backgroundColor: '#007BFF', // A more neutral button color
      marginRight: 20, // Added space between button and status indicator
    },
    statusIndicator: {
      width: 24, // Increase size for a more noticeable indicator
      height: 24, // Maintain aspect ratio for circle shape
      borderRadius: 12, // Ensure the indicator is perfectly round
    },
    available: {
      backgroundColor: 'green', // Bright green for available
    },
    unavailable: {
      backgroundColor: 'darkred', // Dark red for unavailable for better contrast
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold', // Make text bold for better readability
    },
  });
  

export default AvailabilityIndicator;
