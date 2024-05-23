import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    flexWrap: 'wrap', 
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
    flex: 3, 
    justifyContent: 'flex-start',
    paddingRight: 10, 
  },
  priceAndQuantity: {
    flex: 2, 
    justifyContent: 'flex-end',
    alignItems: 'flex-end', 
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 4,
  },
  detail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  origin: {
    fontSize: 14,
    color: '#666',
  },
  priceBought: {
    color: '#ff6347',
    fontSize: 14,
    marginBottom: 4, 
  },
  price: {
    fontWeight: 'bold',
    color: '#2a9d8f',
    fontSize: 16,
  },
  quantity: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
    modifyButton: {
      backgroundColor: 'yellow',
      padding: 8,
      borderRadius: 20,
      elevation: 2,
      marginHorizontal: 10, // Ensure buttons don't stick to each other or to the edge
    },
    modifyButtonText: {
      
      fontWeight: 'bold',
      fontSize: 14,
      color: '#333', 
    },
    
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: '#007bff', 
    marginLeft: 10,
    padding: 10,
    borderRadius: 5, 
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
  