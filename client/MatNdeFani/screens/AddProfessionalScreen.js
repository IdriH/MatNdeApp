import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { addProfessional } from '../services/api'; 
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';

const AddProfessionalScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const defaultImg = require('../assets/AnonimProfPic.jpg');

  async function pickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      const imageUri = result.assets[0].uri; // Access the uri from the first item of the assets array
      console.log('New image URI:', imageUri);
      setImage(imageUri); // Set the image URI to state
    }
  }

  async function takePhoto() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri; // Access the uri from the first item of the assets array
      console.log('New image URI:', imageUri);
      setImage(imageUri); // Set the image URI to state
    }
  }

  
const handleSave = async () => {
  try {
      const professionalData = {
          fullName,
          shortDescription,
          phoneNumber,
          password: password.trim().toLowerCase(),
          category,
          profilePicture: image // Include the selected profile picture
      };

      const formData = new FormData();

      // Append professional data fields to FormData
      Object.keys(professionalData).forEach(key => {
          formData.append(key, professionalData[key]);
      });
      if(professionalData.profilePicture){
      // Convert the image URI to a file object
      const uri = Platform.OS === 'android' ? image : image.replace('file://', ''); // Adjust URI for Android
      const filename = uri.split('/').pop(); // Extract filename from URI
      const match = /\.(\w+)$/.exec(filename); // Extract file extension
      const type = match ? `image/${match[1]}` : 'image'; // Set image type
      const file = {
          uri,
          name: filename,
          type
      };

      // Append profile picture file to FormData
      formData.append('profilePicture', file);
    }
      await addProfessional(formData);
      Alert.alert('Success', 'Professional added successfully');
      navigation.navigate('Professionals');
  } catch (error) {
      console.error('Error saving professional:', error);
      Alert.alert('Error', error.message || 'Could not add professional');
  }
};

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Image source={image ? { uri: image } : defaultImg} style={styles.profileImage} />
      </TouchableOpacity>
      <Text style={styles.imagePickerText} onPress={pickImage}>Choose from Gallery</Text>
      <Text style={styles.imagePickerText} onPress={takePhoto}>Take Photo</Text>
      <TextInput style={styles.input} value={fullName} onChangeText={setFullName} placeholder="Full Name" />
      <TextInput style={styles.input} value={shortDescription} onChangeText={setShortDescription} placeholder="Short Description" multiline />
      <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Phone Number" keyboardType="phone-pad" />
      <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
      <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder="Category" />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.text}>Save Professional</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imagePickerText: {
    fontSize: 16,
    color: '#007bff',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default AddProfessionalScreen;
