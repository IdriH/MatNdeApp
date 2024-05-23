import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    backgroundContainer: {
      flex: 1,
      width: '100%', 
      height: '100%', 
    },
    overlayContainer: {
      flex: 1,
      backgroundColor: 'rgba(255,255,200,0.3)', // This adds an overlay to the image
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      padding: 20,
    },
    header: {
      flex : 0.3,
      fontSize: 32,
      fontWeight: 'bold',
      marginVertical: 50,
      color: '#460E48',
      textAlign: 'center',
      alignSelf : 'flex-start',
      // Adding text shadow
      textShadowColor: 'rgba(100, 0, 0, 0.75)',  // Shadow color
      textShadowOffset: { width: 1, height: 1 },  // Shadow offset
      textShadowRadius: 4,  // Blur radius
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
      position: 'absolute', 
      bottom: 30, 
      right: 30,
    },
    loginButtonText: {
      color: '#fff', 
      backgroundColor: '#460E48', 
      overflow: 'hidden',
      paddingHorizontal: 40, 
      paddingVertical: 20, 
      borderRadius: 10, 
      elevation: 3, 
      // Additional styles for iOS shadow
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    availabilityContainer: {
      marginTop: 30, 
      alignItems: 'center', 
      width: '100%', 
      left: 20, 
      flexDirection: 'row', 
          
    },
    
  });

export default styles;