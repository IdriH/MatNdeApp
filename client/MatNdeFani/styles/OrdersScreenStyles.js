import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 20,
    },
    orderItem: {
      backgroundColor: '#f0f0f0',
      padding: 10,
      marginBottom: 15,
    },
    productItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5,
    },
    productName: {
      fontSize: 16,
    },
    totalText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10,
    },
    acceptButton: {
      backgroundColor: 'green',
      padding: 10,
      borderRadius: 5,
    },
    removeButton: {
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    orderProfName:{
      alignSelf : 'center',
    }
  });

  export default styles;