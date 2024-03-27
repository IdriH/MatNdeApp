import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image } from 'react-native';

// Assuming 'category' will be added to your data model
const ProfessionalRow = ({ fullName, category, available, reviewScore }) => {
    const img = require('../assets/AnonimProfPic.jpg');
    
return (
    <View style={styles.container}>
        <Image source={img} style={styles.profileImage} />
      <View style={styles.professionalDetails}>
        <Text style={styles.name}>{fullName}</Text>
        <Text style={styles.detail}>Category: {category}</Text>
        <Text style={styles.detail}>{available ? 'Available' : 'Unavailable'}</Text>
      </View>
      <View style={styles.reviewScoreContainer}>
        <Text style={styles.reviewScore}>Rating: {reviewScore}</Text>
      </View>
      <TouchableOpacity style={styles.modifyButton}>
        <Text style={styles.modifyButtonText}>Modify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  profileImage: {
    width: 50, // Adjust size as needed
    height: 50, // Adjust size as needed
    borderRadius: 25, // Makes it circular
    marginRight: 10, // Adds some space between the image and the text
  },
  professionalDetails: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
  },
  detail: {
    fontSize: 14,
    color: '#666',
  },
  reviewScoreContainer: {
    // This is adjusted to align the review score to the right
    alignItems: 'flex-end',
  },
  reviewScore: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#4CAF50', // A greenish tone to highlight the review score
  },
  modifyButton: {
    backgroundColor: 'yellow', // Yellow background for modify button
    padding: 8,
    borderRadius: 20, // Rounded corners for the button
    elevation: 2, // Slight shadow for button elevation
  },
});

export default ProfessionalRow;
