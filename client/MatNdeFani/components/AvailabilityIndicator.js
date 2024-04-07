import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const AvailabilityIndicator = () => {
  const [isAvailable, setIsAvailable] = useState(false); // Initial availability status

  const toggleAvailability = () => {
    setIsAvailable(!isAvailable);
    // Update the professional's availability status in your database or state management solution
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
