import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerTouchable: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
    
    profileImage: {
      width: 70,
      height: 70,
      borderRadius: 25,
      marginRight: 10,
    },
    professionalDetails: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems : 'center',
    },
    name: {
      fontWeight: 'bold',
      fontSize: 18,
      color: '#333',
    },
    detail: {
      fontSize: 14,
      color: '#666',
    },
    reviewScoreContainer: {
      // This is adjusted to align the review score to the right
      marginHorizontal : 10,
      alignItems: 'flex-end',
    },
    reviewScore: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#4CAF50', 
    },
    modifyButton: {
      backgroundColor: 'yellow', 
      padding: 8,
      borderRadius: 20,
      elevation: 2,
    },
  });
  
  export default styles;