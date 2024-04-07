import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    backgroundContainer: {
      flex: 1,
      width: '100%', 
      height: '100%', 
    },
    overlayContainer: {
      flex: 1,
      backgroundColor: 'rgba(255,255,255,0.6)', // This adds an overlay to the image
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      padding: 20,
    },
    header: {
      flex : 0.3,
      fontSize: 32,
      fontWeight: 'bold',
      marginVertical: 50,
      color: '#333',
      textAlign: 'center',
      alignSelf : 'flex-start'
    },
    section: {
      width: '100%',
      padding: 20,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      backgroundColor: '#f7f7f7',
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
      
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#460E48',
      textAlign: 'center'
    },
    loginButton: {
      position: 'absolute', // Position the button absolutely
      bottom: 30, // Distance from the bottom
      right: 30, // Distance from the right
    },
    loginButtonText: {
      color: '#fff', // Text color for the button
      backgroundColor: '#460E48', // Background color for the button
      overflow: 'hidden',
      paddingHorizontal: 40, // Horizontal padding
      paddingVertical: 20, // Vertical padding
      borderRadius: 10, // Rounded corners
      elevation: 3, // Drop shadow for Android (optional)
      // Additional styles for iOS shadow
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    availabilityContainer: {
      marginTop: 30, // Adjust the space from the Orders section or above content as needed
      alignItems: 'center', // Center horizontally in the container
      width: '100%', // Ensure it spans the full width for proper centering
      left: 20, // Distance from the left
      flexDirection: 'row', // Align button and status indicator horizontally
          
    },
    
  });

export default styles;