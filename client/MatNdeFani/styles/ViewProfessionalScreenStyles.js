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
    profileImageContainer: {
      flexDirection : 'column',
      justifyContent: 'flex-start'
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
      color: '#007bff',
      textDecorationLine: 'underline', 
    },
    shortDescription : {
      color : '#000000',
      fontSize : 16,
      marginBottom : 20,
    },
    buttonsContainer : {
      position : 'absolute',
      bottom : 20 , 
    
      alignItems : 'space-between',
    },
    deleteReviewButton: {
      position: 'absolute',
      bottom: 20,
      right: 20, 
      backgroundColor: 'red', 
      padding: 10,
      borderRadius: 10, 
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    deleteReviewButtonText: {
      color: 'white',
      fontSize: 11,
      fontWeight: 'bold',
    },
    deleteButton: {
      position: 'absolute',
      bottom: 20,
      left: 20, 
      backgroundColor: 'red', 
      padding: 10,
      borderRadius: 30, 
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    deleteButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    editableTextInput: {
      fontSize: 16,
      marginBottom: 5,
      borderBottomWidth: 1,
      borderColor: 'grey',
      width: '100%', 
    },
    addReviewButton: {
      position: 'absolute', 
      bottom: 20, 
      right: 20, 
      backgroundColor: '#007BFF', 
      padding: 10,
      borderRadius: 30, 
      elevation: 4, // Shadow for Android
      shadowColor: '#000', // Shadow for iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    addReviewButtonText: {
      color: '#FFFFFF', 
      fontSize: 16, 
      fontWeight: 'bold',
    },
      modifyButton: {
      position: 'absolute', 
      bottom: 20, 
      right: 20, 
      backgroundColor: '#d6ce20', 
      padding: 10,
      borderRadius: 30, // Circular button
      elevation: 4, // Shadow for Android
      shadowColor: '#000', // Shadow for iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
      modifyButtonText: {
      color: '#333109', 
      fontSize: 16, 
      fontWeight: 'bold',
    },
    
    
  });
  
 export default styles;