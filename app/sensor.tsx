import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { database, ref, onValue } from '../app/config/firebase'; // Ensure this points to your firebase config

interface SensorData {
  temperature: string;
  humidity: string;
  Do: string;
  message: string;
}

const Sensor: React.FC = () => {
  // Initialize state for the different sensor data
  const [sensorData, setSensorData] = useState<SensorData>({
    temperature: '',
    humidity: '',
    Do: '',
    message: '',
  });

  useEffect(() => {
    // Reference to the 'project/test' node in the Realtime Database
    const sensorRef = ref(database, 'test');

    // Listen for changes in the 'test' path in the database
    onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Update the state with the fetched data
        setSensorData({
          temperature : data.temperature  || '',
          humidity: data.humidity || '',
          Do: data.DO || '',
          message: data.message || '',
        });
      }
    });

    // Cleanup listener when the component is unmounted
    return () => {
      // You can remove listeners if necessary (optional)
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Temperature: {sensorData.temperature}</Text>
      <Text style={styles.text}>Humidity: {sensorData.humidity}</Text>
      <Text style={styles.text}>DO (Dissolved Oxygen): {sensorData.Do}</Text>
      <Text style={styles.text}>Message: {sensorData.message}</Text>
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
