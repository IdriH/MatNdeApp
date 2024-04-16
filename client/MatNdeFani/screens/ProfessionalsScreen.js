import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import ProfessionalRow from '../components/ProfessionalRow'; // This needs to be implemented by you
import styles from '../styles/ProfessionalsScreenStyles';

import { useUser } from '../state/UserContext';
import { fetchProfessionals } from '../services/api';

const ProfessionalsScreen = ({ navigation }) => {
  const { user } = useUser();
  const [professionals, setProfessionals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadProfessionals = async () => {
      try {
        const professionalsFromApi = await fetchProfessionals();
        setProfessionals(professionalsFromApi); // Assuming the API returns the array of professionals directly
      } catch (error) {
        console.error('Failed to fetch professionals:', error);
        // Implement error handling here
      }
    };
    loadProfessionals();
  }, []);

  // Filter professionals based on the search query
  const filteredProfessionals = professionals.filter(professional =>
    professional.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderProfessional = ({ item }) => (
    <ProfessionalRow
      professionalID={item.professionalID}
      fullName={item.fullName}
      category={item.category}
      
      //shortDescription = {item.ShortDescription}
      available={item.available}
      reviewScore={item.reviewScore}
      navigation={navigation}
    />
  );
      
     
      

  // Replace with your actual background image
  const backgroundImage = require('../assets/homepage.jpg');

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Professionals</Text>
        <TextInput
          placeholder="Search by Category."
          style={styles.searchBox}
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)} // Update searchQuery state on text change
        />

        <FlatList
          data={filteredProfessionals}
          keyExtractor={(item) => item.professionalID}
          renderItem={renderProfessional}
          // The rest of your props
        />
        {(user.role === 'admin')?(
          <TouchableOpacity style={styles.addButton} onPress={() => {/* handle add professional */}}>
          <Text style={styles.addButtonText}>+ Add Professional</Text>
        </TouchableOpacity>
        ):(null)}
        
      </View>
    </ImageBackground>
  );
};

export default ProfessionalsScreen;
