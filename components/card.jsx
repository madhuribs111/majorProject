import { Text, View, StyleSheet } from "react-native";
export function Card({sensorId, sensorName, location}) {
    return (
        <View style={styles.card}>
          <Text style={styles.sensorId}>Sensor ID: {sensorId}</Text>
          <Text style={styles.sensorName}>Sensor Name: {sensorName}</Text>
         
        </View>
      );
  }

  const styles = StyleSheet.create({
    card: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
      marginHorizontal: 40,  // This sets a 4px margin on the left and right
      height: 200,          // Set the height to 200px
      width: '100%',        // Use '100%' to make the card take the full width
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 4,
      elevation: 5,
    },
    sensorId: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    sensorName: {
      fontSize: 14,
      marginBottom: 5,
    },
    location: {
      fontSize: 14,
      color: '#555',
    },
  });
  