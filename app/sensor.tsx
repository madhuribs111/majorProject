import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { database, ref, onValue } from '../app/config/firebase'; // Ensure this points to your firebase config
import { useLocalSearchParams } from 'expo-router';
interface SensorData {
  temperature: string;
  humidity: string;
  Do: string;
 prediction: string;
}

const Sensor: React.FC = () => {
  // Initialize state for the different sensor data
  const [sensorData, setSensorData] = useState<SensorData>({
    temperature: '',
    humidity: '',
    Do: '',
    prediction: '',
  });
const {sensorId} = useLocalSearchParams()
  useEffect(() => {
    // Reference to the 'project/test' node in the Realtime Database
    if(sensorId){const sensorRef = ref(database,`sensorData/${sensorId}`);

    // Listen for changes in the 'test' path in the database
    onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Update the state with the fetched data
        setSensorData({
          temperature : data.Temperature  || '',
          humidity: data.Humidity || '',
          Do: data.DO || '',
          prediction: data.prediction || '',
        });
      }
    });

    // Cleanup listener when the component is unmounted
    return () => {
      // You can remove listeners if necessary (optional)
    }};

  }, [sensorId]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sensor ID: {sensorId}</Text>
      <Text style={styles.text}>Temperature: {sensorData.temperature}</Text>
      <Text style={styles.text}>Humidity: {sensorData.humidity}</Text>
      <Text style={styles.text}>DO (Dissolved Oxygen): {sensorData.Do}</Text>
      <Text style={styles.text}>Water Quality: {sensorData.prediction}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Sensor;
