import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    
    container: {
        flex : 1,
        justifyContent : 'center',
        alignItems :'center',
        paddingTop: 20,
    },

    scrollContainer: {
        width:'90%'
    },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 24,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f7f7f7',
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 50
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 20,
  },
});

export default styles;