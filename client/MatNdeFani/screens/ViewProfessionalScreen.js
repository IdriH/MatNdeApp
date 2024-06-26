import React from 'react';
import {Dimensions, TextInput,ScrollView, View, Text, Image, StyleSheet, FlatList,TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
import styles from '../styles/ViewProfessionalScreenStyles';
import { useState,useEffect } from 'react';
import { useUser } from '../state/UserContext';
import { fetchProfessional,fetchReviewsForProfessional, modifyProfessional ,deleteProfessional , deleteReview , updateProfessionalPicture} from '../services/api';
import { Alert } from 'react-native';
import API_BASE_URL from '../services/api';
import ProfileImageEditor from '../components/ProfileImageEditor'
import { Platform } from 'react-native';
const ViewProfessionalScreen = ({ route, navigation }) => {
  const { professionalID } = route.params;

    const {user} = useUser();

    const [professional,setProfessional] = useState({});

    const [category, setCategory] = useState(professional.category);
    const [phoneNumber, setPhoneNumber] = useState(professional.phoneNumber);
    const [shortDescription, setShortDescription] = useState(professional.shortDescription);
    
    const [image, setImage] = useState(professional.profileImage);

    useEffect(() => {
      const loadProfessional = async () => {
        try {
          //console.log('Fetching details for ProfessionalID:', professionalID);
          const professionalFromApi = await fetchProfessional(professionalID);
          setProfessional(professionalFromApi); 
        } catch (error) {
          console.error('Failed to fetch professional:', error);
          
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
         // console.log('Fetching details for ProfessionalID:', professionalID);
          const reviewsFromApi = await fetchReviewsForProfessional(professionalID);
         // console.log(reviewsFromApi)
          setReviews(reviewsFromApi);
        } catch (error) {
          console.error('Failed to fetch reviews for professional:', error);
         
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
       // console.log('Fetching details for ProfessionalID:', professionalID);
        const reviewsFromApi = await fetchReviewsForProfessional(professionalID);
        //console.log(reviewsFromApi)
        setReviews(reviewsFromApi); 
      } catch (error) {
        console.error('Failed to fetch reviews for professional:', error);
        
      }
    };
    if (professionalID) {
      loadReviewsForProfessional();
    } 
  });

  return unsubscribe;
}, [navigation]);

useEffect(() => {
  if (professional) {
    setCategory(professional.category);
    setPhoneNumber(professional.phoneNumber);
    setShortDescription(professional.shortDescription);
   
  }
}, [professional]);

useEffect(() => {
  if (professional.profilePicture) {
      // Replace backslashes if they exist just in case
      const imagePath = professional.profilePicture.replace(/\\/g, '/');
      const imageUri = `${API_BASE_URL}/${imagePath}`;
      setImage(imageUri);
  } else {
      setImage(require('../assets/AnonimProfPic.jpg'));
  }
}, [professional.profilePicture]);




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

  const handleModify = async () => {
    try {
      const updatedFields = {
        category,
        phoneNumber,
        ShortDescription: shortDescription,
        profilePicture: professional.profilePicture,
      };
      const response = await modifyProfessional(professionalID, updatedFields);
      
  
      
      Alert.alert('Success', 'Professional details updated successfully', [
        { text: 'OK', onPress: () => navigation.navigate('Professionals') }
      ]);
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Error', 'Failed to update professional details', [
        { text: 'OK', onPress: () => navigation.navigate('Professionals') }
      ]);
    }
  };

  const handleDelete = async() => {
    try{
      const response = await deleteProfessional(professionalID);
      Alert.alert('Success', 'Professional deleted successfully', [
        { text: 'OK', onPress: () => navigation.navigate('Professionals') }
      ]);
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Error', 'Failed to deletePRofessionals', [
        { text: 'OK', onPress: () => navigation.navigate('Professionals') }
      ]);
    }
  }
  

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
    } catch (error) {
      console.error('Failed to delete review:', error);
      Alert.alert('Error', 'Failed to delete review');
    }
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
        <TouchableOpacity style={styles.deleteReviewButton} onPress={() => handleDeleteReview(item._id)}>
        <Text style = {styles.deleteReviewButtonText}>X</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderEditableText = (value, onChangeText) => (
    <TextInput style={styles.editableTextInput} value={value} onChangeText={onChangeText} />
  );

  const handleUpdateImage = async (newImageUri) => {
    try {
        console.log(newImageUri + "HIUHIUHIUHIU")
        const formData = new FormData();
        formData.append('professionalID', professionalID);

        if (newImageUri) {
            const uri = Platform.OS === 'android' ? newImageUri : newImageUri.replace('file://', '');
            const filename = uri.split('/').pop();
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1]}` : 'image';
            const file = {
                uri,
                name: filename,
                type
            };
            formData.append('profilePicture', file);
        }

        const responseData = await updateProfessionalPicture(formData);
        if (responseData) {
          Alert.alert('Success', 'Profile picture updated successfully');
          setProfessional(prev => ({...prev, profilePicture: `${API_BASE_URL}/${responseData.data.profilePicture}`}));
        } else {
          throw new Error('Failed to update profile picture');
        }
      } catch (error) {
        console.error('Error updating profile picture:', error);
        throw new Error('Network or server error occurred: ' + error.message);
      }
};


const handleRemoveImage = async () => {
  try {
      // Remove the professional's profile picture by setting it to null or an empty string
      const updatedFields = { profilePicture: '' };
      const data = await modifyProfessional(professionalID, updatedFields);

      Alert.alert('Success', 'Profile picture removed successfully');
      
  } catch (error) {
      console.error('Error removing profile picture:', error);
      Alert.alert('Error', error.message || 'Failed to remove profile picture');
  }
};

const window = Dimensions.get('window')

const imageUri = professional.profilePicture ? { uri: `${API_BASE_URL}/${professional.profilePicture}` } : require('../assets/AnonimProfPic.jpg');

  //const imagePath = professional.profilePicture.replace(/\\/g, '/');
  //const imageUri = professional.profilePicture ? `${API_BASE_URL}/${imagePath}` : require('../assets/AnonimProfPic.jpg');


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{professional.fullName}</Text>
      <View style={styles.detailsContainer}>
  
      <View style={styles.profileImageContainer} >
      <Image source={imageUri} style={styles.profileImage} />
      {(user.role === 'admin')?(
      <ProfileImageEditor
          
          setImage={setImage}
          
          onUpdate={handleUpdateImage}
          onRemove={handleRemoveImage}
      />
      ):null
      }
      </View> 
      
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Emri: {professional.fullName}</Text>
          <Text style={styles.infoText}>Disponibiliteti: {professional.available ? 'Available' : 'Unavailable'}</Text>
          <Text style={styles.infoText}>Review Score: {professional.reviewScore}</Text>
          <View style = {styles.infoContainer}>
                {(user.role === 'admin') ? (
                <TextInput 
                    style={styles.editableTextInput}
                    defaultValue={professional.category} 
                    value={category} onChangeText={setCategory}
                />
                ) : (
                <Text style={styles.infoText}>Kategoria: {professional.category}</Text>
             )}
          </View>
          <View style = {styles.infoContainer}>
                {(user.role === 'admin') ? (
                <TextInput 
                    style={styles.editableTextInput}
                    defaultValue={professional.phoneNumber} 
                    value={phoneNumber} onChangeText={setPhoneNumber}
                />
                ) : (
                    <TouchableOpacity onPress={handlePressPhoneNumber}>
                        <Text style={styles.phoneNumber}>{professional.phoneNumber}</Text>
                    </TouchableOpacity>
             )}
        </View>
        
          
        </View>
        
      </View>
      {(user.role === 'admin') ? (
                <TextInput 
                style={styles.editableTextInput}
                defaultValue={professional.ShortDescription}
                value={shortDescription} 
                onChangeText={setShortDescription}
              />
              
            ):(
                <Text style={styles.shortDescription}>Pershkrimi: {professional.ShortDescription}</Text>
            )}
    
      <Text style = {{fontSize : 16}}>Komente te klienteve:</Text>
      <FlatList
        data={reviews} 
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderReview}
      />
      <View>
      
  {user.role === 'admin' ? (
    <View>
      <TouchableOpacity style={styles.modifyButton} onPress={handleModify}>
        <Text style={styles.modifyButtonText}>Modify</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Delete{'\n'}Professional</Text>
      </TouchableOpacity>
    </View>
  ) : user.role === 'professional' ? (
    // Render nothing for professionals
    null
  ) : (
    // This will render for users who are neither admin nor professionals
    <View style={styles.addReviewButton}>
      <TouchableOpacity onPress={navigateToAddReview}>
        <Text style={styles.addReviewButtonText}>+ Shto koment</Text>
      </TouchableOpacity>
    </View>
  )}
</View>

    </View>
  );
};

export default ViewProfessionalScreen;
