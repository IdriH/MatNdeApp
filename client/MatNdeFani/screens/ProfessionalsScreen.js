import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import ProfessionalRow from '../components/ProfessionalRow'; // This needs to be implemented by you
import styles from '../styles/ProfessionalsScreenStyles';
import { useFocusEffect } from '@react-navigation/native';

import { useUser } from '../state/UserContext';
import { fetchProfessionals } from '../services/api';
import AddProfessionalScreen from './AddProfessionalScreen';

const ProfessionalsScreen = ({ navigation }) => {
  const { user } = useUser();
  const [professionals, setProfessionals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  const loadProfessionals = async () => {
    try {
      const professionalsFromApi = await fetchProfessionals();
    
      setProfessionals(professionalsFromApi); // Assuming the API returns the array of professionals directly
    } catch (error) {
      console.error('Failed to fetch professionals:', error);
     
    }
  };
  
  useEffect(() => {
    
    loadProfessionals();
  }, []);

   // Use focus effect to refetch professionals when navigating back to the screen
   useFocusEffect(
    React.useCallback(() => {
      loadProfessionals();
    }, [])
  );

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
      profilePicture={item.profilePicture}
      navigation={navigation}
    />
  );
      
     
      

 
  const backgroundImage = require('../assets/Professionals.jpeg');

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Profesionist</Text>
        <TextInput
          placeholder="Kerko sipas kategorise..."
          style={styles.searchBox}
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)} 
        />

        <FlatList
          data={filteredProfessionals}
          keyExtractor={(item) => item.professionalID}
          renderItem={renderProfessional}
         
        />
        {(user.role === 'admin')?(
          <TouchableOpacity style={styles.addButton} onPress={() => {navigation.navigate('AddProfessional')}}>
          <Text style={styles.addButtonText}>+ Add Professional</Text>
        </TouchableOpacity>
        ):(null)}
        
      </View>
    </ImageBackground>
  );
};

export default ProfessionalsScreen;
