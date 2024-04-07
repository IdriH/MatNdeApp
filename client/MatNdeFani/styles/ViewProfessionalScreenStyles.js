import { StyleSheet } from "react-native";


const styles = StyleSheet.create({


    container: {
  
      flex: 1,
      marginHorizontal: 10,
    },
    title: {
      marginTop : 30,
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 20,
    },
    detailsContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginRight: 20,
    },
    infoContainer: {
      
      justifyContent: 'space-around',
    },
    infoText: {
      fontSize: 16,
      marginBottom: 5,
    },
    review: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    reviewText: {
      fontSize: 14,
      color: '#333',
    },
    reviewRating: {
      fontSize: 14,
      color: '#007BFF',
      marginTop: 5,
    },
    phoneNumber: {
      color: '#007bff', // Example color for a link
      textDecorationLine: 'underline', // Underline to indicate it's clickable
    },
    shortDescription : {
      color : '#000000',
      fontSize : 16,
      marginBottom : 20,
    },
    deleteButton: {
      position: 'absolute', // Position the button over the container
      bottom: 10, // Distance from the bottom of the container
      right: 10, // Distance from the right of the container
      backgroundColor: 'red', // Background color of the button
      padding: 5,
      borderRadius: 5, // Rounded corners
      elevation: 2, // Shadow for Android (optional)
      // For iOS shadow:
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
    },
    deleteButtonText: {
      color: 'white', // Font color
      fontSize: 14, // Adjust to your liking
    },
    editableTextInput: {
      fontSize: 16,
      marginBottom: 5,
      borderBottomWidth: 1,
      borderColor: 'grey',
      width: '100%', // Ensure it occupies the full width
    },
    addReviewButton: {
      position: 'absolute', // Position the button over the container
      bottom: 20, // Distance from the bottom of the screen
      right: 20, // Distance from the right of the screen
      backgroundColor: '#007BFF', // Choose a background color that fits your app's theme
      padding: 10,
      borderRadius: 30, // Circular button
      elevation: 4, // Shadow for Android
      shadowColor: '#000', // Shadow for iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    addReviewButtonText: {
      color: '#FFFFFF', // Text color
      fontSize: 16, // Adjust to your liking
      fontWeight: 'bold',
    },
      modifyButton: {
      position: 'absolute', // Position the button over the container
      bottom: 20, // Distance from the bottom of the screen
      right: 20, // Distance from the right of the screen
      backgroundColor: '#d6ce20', // Choose a background color that fits your app's theme
      padding: 10,
      borderRadius: 30, // Circular button
      elevation: 4, // Shadow for Android
      shadowColor: '#000', // Shadow for iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
      modifyButtonText: {
      color: '#333109', // Text color
      fontSize: 16, // Adjust to your liking
      fontWeight: 'bold',
    },
  });
  
 export default styles;