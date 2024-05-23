import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,TouchableWithoutFeedback ,KeyboardAvoidingView,Platform, ScrollView} from 'react-native';
import { useState,useEffect } from 'react';
import { submitReview } from '../services/api';
import { Alert } from 'react-native';  
const AddReviewScreen = ({navigation,route}) => {
    const [name, setName] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(5);

    const {  professionalID } = route.params; // Destructuring to get addReview and professionalID

    
   

    

    const handleConfirm = async () => {
        const reviewData = {
            professionalID,
            reviewerName: name,
            score: rating,
            comment: review,
        };

        try {
            await submitReview(reviewData);
            Alert.alert(
                'Review Submitted',  // Title of the alert
                'Your review has been added successfully',  // Message of the alert
                [
                    { text: 'OK', onPress: () => navigation.goBack() }  // Button to dismiss the alert and go back
                ]
            );
        } catch (error) {
            console.error('Failed to add review:', error);
            Alert.alert(
                'Error',  // Title of the alert
                'Failed to add review: ' + (error.message || 'Unknown error'),  // Error message extracted from the exception
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') }  // Button to dismiss the alert
                ]
            );
        }
    };

    const handleCancel = () => {
        navigation.goBack();
        
    };
    
    // Function to render stars for rating
    const renderStars = () => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <TouchableWithoutFeedback key={i} onPress={() => setRating(i)}>
                    <Text style={[styles.star, rating >= i ? styles.filledStar : styles.emptyStar]}>
                        ★
                    </Text>
                </TouchableWithoutFeedback>
            );
        }
        return stars;
    };


    return (
        
        <KeyboardAvoidingView
            
            style={styles.container}
        >
        
       
            
            <Text style={styles.label}>Emri:</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Shkruani emrin tuaj"
                value={name} 
                onChangeText={setName} 
            />
            <Text style={styles.label}>Komenti:</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Shkruaj komentin tend"
                multiline 
                numberOfLines={4} 
                maxLength={200}
                value={review}
                onChangeText={setReview} 
                
            />
            <View style={styles.starsContainer}>{renderStars()}</View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
                    <Text style={styles.buttonText}>Konfirmo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                    <Text style={styles.buttonText}>Anullo</Text>
                </TouchableOpacity>
            </View>
        
        
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#fff',
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    confirmButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
    },
    cancelButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
   
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    star: {
        fontSize: 30,
        margin: 5,
    },
    filledStar: {
        color: '#FFD700', // Gold color for filled stars
    },
    emptyStar: {
        color: '#CCCCCC', // Light grey color for empty stars
    },
});

export default AddReviewScreen;
