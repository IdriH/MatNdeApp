import React from 'react';
import {Dimensions, TextInput,ScrollView, View, Text, Image, StyleSheet, FlatList,TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
import styles from '../styles/ViewProfessionalScreenStyles';
import { useState,useEffect } from 'react';
import { useUser } from '../state/UserContext';
import { fetchProfessional,fetchReviewsForProfessional } from '../services/api';

const ViewProfessionalScreen = ({ route, navigation }) => {
  const { professionalID } = route.params;

    const {user} = useUser();

    const [professional,setProfessional] = useState({});

    
    useEffect(() => {
      const loadProfessional = async () => {
        try {
          console.log('Fetching details for ProfessionalID:', professionalID);
          const professionalFromApi = await fetchProfessional(professionalID);
          setProfessional(professionalFromApi); // Assuming the API returns the professional object directly
        } catch (error) {
          console.error('Failed to fetch professional:', error);
          // Implement error handling here
        }
      };
      if (professionalID) {
        loadProfessional();
      }
    }, []); // Do optimistic update or some kind of fetcheverytime 
   
    const [reviews, setReviews] = useState(professional.reviews);
   
    useEffect(() => {
      const loadReviewsForProfessional = async () => {
        try {
          console.log('Fetching details for ProfessionalID:', professionalID);
          const reviewsFromApi = await fetchReviewsForProfessional(professionalID);
          console.log(reviewsFromApi)
          setReviews(reviewsFromApi); // Assuming the API returns the professional object directly
        } catch (error) {
          console.error('Failed to fetch reviews for professional:', error);
          // Implement error handling here
        }
      };
      if (professionalID) {
        loadReviewsForProfessional();
      }
    }, []); // Depend on professionalID to refetch if it changes optimistic update or infinite loop

    //everytime user navigates back the reviews are refetched 
   // This useEffect listens for focus events
useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    const loadReviewsForProfessional = async () => {
      try {
        console.log('Fetching details for ProfessionalID:', professionalID);
        const reviewsFromApi = await fetchReviewsForProfessional(professionalID);
        console.log(reviewsFromApi)
        setReviews(reviewsFromApi); // Assuming the API returns the professional object directly
      } catch (error) {
        console.error('Failed to fetch reviews for professional:', error);
        // Implement error handling here
      }
    };
    if (professionalID) {
      loadReviewsForProfessional();
    }
  });

  return unsubscribe;
}, [navigation]);


    const handlePressPhoneNumber = () => {
    const url = `tel:${professional.phoneNumber}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle phone number: " + professional.phoneNumber);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

      
 


  const navigateToAddReview = () => {
    navigation.navigate('AddReview', {
      professionalID, // Assuming professionalID is available in this scope
    });
};

  const renderReview = ({ item }) => (
    
    <View style={styles.review}>
      <Text style={styles.reviewText}>{item.reviewerName}</Text>
      <Text style={styles.reviewText}>{item.comment}</Text>
      <Text style={styles.reviewRating}>Rating: {item.score}</Text>
      {(user.role === 'admin')  && (
        <TouchableOpacity style={styles.deleteButton} >
          <Text style = {styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderEditableText = (value, onChangeText) => (
    <TextInput style={styles.editableTextInput} value={value} onChangeText={onChangeText} />
  );

const window = Dimensions.get('window')

const img = require('../assets/AnonimProfPic.jpg');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{professional.fullName}</Text>
      <View style={styles.detailsContainer}>
        <Image source={img} style={styles.profileImage} />
        <View style={styles.infoContainer}>
            {(user.role === 'admin') ? (
                <TextInput 
                    style = {styles.editableTextInput}
                    >{professional.fullName}</TextInput>
            ):(
                <Text style={styles.infoText}>Name: {professional.fullName}</Text>
            )}
    
          <Text style={styles.infoText}>Availability: {professional.available ? 'Available' : 'Unavailable'}</Text>
          <Text style={styles.infoText}>Review Score: {professional.reviewScore}</Text>
          <View style = {styles.infoContainer}>
                {(user.role === 'admin') ? (
                <TextInput 
                    style={styles.editableTextInput}
                    defaultValue={professional.category} // Use defaultValue for initial rendering
                />
                ) : (
                <Text style={styles.infoText}>Category: {professional.category}</Text>
             )}
          </View>
          <View style = {styles.infoContainer}>
                {(user.role === 'admin') ? (
                <TextInput 
                    style={styles.editableTextInput}
                    defaultValue={professional.dateOfBirth} // Use defaultValue for initial rendering
                />
                ) : (
                    <Text style={styles.infoText}>Date Of Birth: {professional.dateOfBirth}</Text>
             )}
          </View>
          <View style = {styles.infoContainer}>
                {(user.role === 'admin') ? (
                <TextInput 
                    style={styles.editableTextInput}
                    defaultValue={professional.phoneNumber} // Use defaultValue for initial rendering
                />
                ) : (
                    <TouchableOpacity onPress={handlePressPhoneNumber}>
                        <Text style={styles.phoneNumber}>{professional.phoneNumber}</Text>
                    </TouchableOpacity>
             )}
          </View>
        
          
        </View>
        
      </View>
      <View>
        <Text style={styles.shortDescription}>Description: {professional.ShortDescription}</Text>
      </View>
      <Text style = {{fontSize : 16}}>Customer Reviews:</Text>
      <FlatList
        data={reviews} // Assuming reviews is a list of review objects
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderReview}
      />
      {!(user.role === 'admin')  ? (
      <View style={styles.addReviewButton}>
            <TouchableOpacity onPress={navigateToAddReview}>
              <Text style={styles.addReviewButtonText}>+ Add Review</Text>
          </TouchableOpacity>
            </View>
        ) : (
            <View style={styles.modifyButton}>
                <TouchableOpacity style={styles.modifyButton} onPress={() => navigation.navigate('ViewProfessional')}>
                <Text style={styles.modifyButtonText}>Modify</Text>
                    </TouchableOpacity>
            </View>
        )   
        }
    </View>
  );
};

export default ViewProfessionalScreen;
