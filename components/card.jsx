import { Text, View, StyleSheet } from "react-native";
export function HapticTab({sensorId, sensorName, location}) {
    return (
        <View style={styles.card}>
          <Text style={styles.sensorId}>Sensor ID: {sensorId}</Text>
          <Text style={styles.sensorName}>Sensor Name: {sensorName}</Text>
          <Text style={styles.location}>Location: {location}</Text>
        </View>
      );
  }

  const styles = StyleSheet.create({
    card: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
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
  