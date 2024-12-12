import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

export function Card({ sensorId, sensorName, location, onClick }) {
  return (
    <View style={styles.parent}>
      <TouchableOpacity style={styles.card} onPress={onClick}>
        <Text style={styles.sensorId}>Sensor ID: {sensorId}</Text>
        <Text style={styles.sensorName}>Sensor Name: {sensorName}</Text>
        <Text style={styles.location}>Sensor Location: {location}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: 'center',  // Center items vertically
    alignItems: 'center',
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    marginHorizontal: 30,  // This sets a margin on the left and right
    height: 200,           // Fixed height of 200px
    width: '85%',          // Adjusted to 85% of the parent container's width
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  sensorId: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sensorName: {
    textAlign: "left",
    fontSize: 14,
    marginBottom: 5,
  },
  location: {
    textAlign: "left",
    fontSize: 14,
    color: '#555',
  },
});
