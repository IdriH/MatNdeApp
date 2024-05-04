import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/ProfileImageEditorStyles'; // Define and import your styles accordingly
import Icon from 'react-native-vector-icons/MaterialIcons';
const ProfileImageEditor = ({ imageUri, onUpdate, onRemove }) => {
    const [image, setImage] = useState(imageUri);
    const defaultImg = require('../assets/AnonimProfPic.jpg');
    const iconSize = 30;


    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
            return;
        }
        

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.uri);
            onUpdate(result.uri);  // Call the onUpdate prop function passing new image uri
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Sorry, we need camera permissions to make this work!');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.uri);
            onUpdate(result.uri);  // Call the onUpdate prop function passing new image uri
        }
    };

    const removeImage = () => {
        setImage(null); // Remove image from local state
        onRemove(); // Call the onRemove prop function
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={pickImage}>
                    <Icon name="photo-library" size={iconSize} color="#007BFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={takePhoto}>
                    <Icon name="camera-alt" size={iconSize} color="#007BFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={removeImage}>
                    <Icon name="delete" size={iconSize} color="red" />
                </TouchableOpacity>
                
            </View>
        </View>
    );
};

export default ProfileImageEditor;
