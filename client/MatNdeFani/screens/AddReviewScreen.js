import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,TouchableWithoutFeedback } from 'react-native';
import { useState,useEffect } from 'react';
import { submitReview } from '../services/api';

const AddReviewScreen = ({navigation,route}) => {
    const [name, setName] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(5);

    const {  professionalID } = route.params; // Destructuring to get addReview and professionalID

    



    const handleConfirm = async () => {
       
        const reviewData = {
            professionalID, // Make sure this matches the type expected by the schema (Number).
            reviewerName: name, // Changed from 'name' to 'reviewerName'.
            score: rating, // Changed from 'rating' to 'score'.
            comment: review, // Changed from 'text' to 'comment'.
        };
    
        try {
            await submitReview(reviewData);
            console.log('Review added successfully');
            navigation.goBack(); // Navigate back after adding the review
        } catch (error) {
            console.error('Failed to add review:', error);
            // Optionally, handle the error in UI (e.g., show a message to the user)
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
        <View style={styles.container}>
            <Text style={styles.label}>Your Name:</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Enter your name"
                value={name} 
                onChangeText={setName} // Update name state when text changes
            />
            <Text style={styles.label}>Your Review:</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Write your review here"
                multiline 
                numberOfLines={4} 
                maxLength={200}
                value={review}
                onChangeText={setReview} // Update review state when text changes
            />
            <View style={styles.starsContainer}>{renderStars()}</View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
                    <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
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
    // Existing styles...
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
