// screens/ProfessionalsScreen.js
import React from 'react';
import { View, Text, TextInput, FlatList, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import ProfessionalRow from '../components/ProfessionalRow'; // This needs to be implemented by you
import styles from '../styles/ProfessionalsScreenStyles';

import { useState } from 'react';
import { useUser } from '../state/UserContext';

const dummyProfessionalsData = [
    {
      professionalID: 1,
      fullName: 'John Doe',
      category: 'plumber',
      age: 35,
      ShortDescription: 'Experienced electrician specializing in residential and commercial installations.',
      available: true,
      reviewScore: 4.5,
      phoneNumber: '123-456-7890',
    },
    {
      professionalID: 2,
      category: 'Electrician',
      fullName: 'Jane Smith',
      age: 42,
      ShortDescription: 'Licensed plumber with over 8 years of experience in a wide range of plumbing services.',
      available: true,
      reviewScore: 4.7,
      phoneNumber: '098-765-4321',
    },
    // Add more professionals as needed
  ];
  

const ProfessionalsScreen = ({navigation}) => {

  const {user} = useUser();
  
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProfessionalsData = dummyProfessionalsData.filter(professional =>
    professional.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

        const renderProfessional = ({ item }) => (
          <ProfessionalRow
            professionalID ={item.professionalID}
            fullName={item.fullName}
            category={item.category}
            age={item.age}
            available={item.available}
            reviewScore={item.reviewScore}
            navigation = {navigation}
           
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
          data={filteredProfessionalsData}
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
