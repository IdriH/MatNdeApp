import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
      },

  container: {
    
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // You can adjust the alpha value for transparency
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 20,
  },
  searchBox: {
    height: 40,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 18,
  },
  productList: {
    width: '100%',
  },
  productItem: {
    backgroundColor: '#f7f7f7',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  modifyButton: {
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 5,
  },
  modifyButtonText: {
    color: '#000', // Text color for the button
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#460E48', // Use your app theme color here
    padding: 15,
    borderRadius: 30, // Circular button
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  // ... You may want to refine these styles further
});

export default styles;