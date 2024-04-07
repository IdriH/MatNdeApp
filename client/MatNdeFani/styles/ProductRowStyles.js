import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      width: "100%",
      flexDirection: 'row',
      justifyContent: 'space-evenly',
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
    productDetails: {
      // Adjust flex proportion to give more room to product details
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
    origin: {
      fontSize: 14,
      color: '#666',
    },
    priceAndQuantity: {
       // Adjust flex proportion to give necessary room to price and quantity
      alignItems: 'flex-end', // Align price and quantity to the right
    },
    priceBought: {
      
      color: '#ff6347', // Red color for priceBought to indicate cost
      fontSize: 14,
    },
    price: {
      fontWeight: 'bold',
      color: '#2a9d8f', // Green color for priceSold to indicate sale price
      fontSize: 16,
    },
    quantity: {
      marginTop: 4, // Add a little margin to separate it from the price
      fontSize: 14,
      color: '#555',
    },
    modifyButton: {
      backgroundColor: 'yellow', // Yellow background for modify button
      padding: 8,
      borderRadius: 20, // Rounded corners for the button
      elevation: 2, // Slight shadow for button elevation
    },
    modifyButtonText: {
      fontWeight: 'bold',
      fontSize: 14,
      color: '#333', // Text color inside the button
    },
      // Existing styles...
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: '#007bff', // A visually appealing blue
    marginLeft: 10, // Spacing between buttons
    padding: 10,
    borderRadius: 5, // Rounded corners
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3, // For Android
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  });

  export default styles;
  