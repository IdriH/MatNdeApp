// styles/ProfessionalsScreenStyles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjusted for a slightly different look
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
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#007BFF', // Different color for differentiation
        padding: 15,
        borderRadius: 30,
        elevation: 3,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    // Add or adjust other styles as necessary
});

export default styles;
