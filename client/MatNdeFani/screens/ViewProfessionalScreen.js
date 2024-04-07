import React from 'react';
import {Dimensions, TextInput,ScrollView, View, Text, Image, StyleSheet, FlatList,TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
import styles from '../styles/ViewProfessionalScreenStyles';
import { useState } from 'react';
import { useUser } from '../state/UserContext';

const professional = {
  professionalID: 1,
  fullName: 'Alex Johnson',
  category: 'Electrician',
  dateOfBirth: '10/10/2000',
  available: true,
  reviewScore: 4.7,
  ShortDescription: 'Experienced and reliable electrician specializing in residential electrical services. Certified and insured, committed to safety and quality.',
  phoneNumber: '+355695776284',
  
  reviews: [
    {
      id: 1,
      text: 'Alex did an amazing job fixing our electrical panel. Very professional and timely.',
      rating: 5,
    },
    {
      id: 2,
      text: 'Great service, Alex was very thorough and explained everything clearly. Highly recommend!',
      rating: 4.5,
    },
    {
      id: 3,
      text: 'Alex was able to solve a problem that we had for months. Extremely satisfied with the work.',
      rating: 4.8,
    },
    {
      id: 4,
      text: 'Alex did an amazing job fixing our electrical panel. Very professional and timely.',
      rating: 5,
    },
    {
      id: 5,
      text: 'Great service, Alex was very thorough and explained everything clearly. Highly recommend!',
      rating: 4.5,
    },
    {
      id: 6,
      text: 'Alex was able to solve a problem that we had for months. Extremely satisfied with the work.',
      rating: 4.8,
    },
    {
      id: 7,
      text: 'Great service, Alex was very thorough and explained everything clearly. Highly recommend!',
      rating: 4.5,
    },
    {
      id: 8,
      text: 'Alex was able to solve a problem that we had for months. Extremely satisfied with the work.',
      rating: 4.8,
    },
  ],
};

const ViewProfessionalScreen = ({navigation }) => {

    const {user} = useUser();

   
   
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

      
  const [reviews, setReviews] = useState(professional.reviews);

  const addReview = (newReview) => {
      setReviews(currentReviews => [...currentReviews, { ...newReview, id: currentReviews.length + 1 }]);
  };

  const navigateToAddReview = () => {
    navigation.navigate('AddReview', { addReview });
};

  const renderReview = ({ item }) => (
    <View style={styles.review}>
      <Text style={styles.reviewText}>{item.text}</Text>
      <Text style={styles.reviewRating}>Rating: {item.rating}</Text>
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
        keyExtractor={(item) => item.id.toString()}
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
