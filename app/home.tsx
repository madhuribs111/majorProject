import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Card } from "../components/card.jsx";
import { getFromSecureStore } from "./util/secureStore";
import { BlurView } from "expo-blur"; // Install expo-blur
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";

interface SensorData {
  sensor_id: string;
  name: string;
  location: string;
  data: {
    do: string;
    temperature: string;
    humidity: string;
  };
  database_url: string;
  web_token: string;
}

const Home = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [sensorData, setSensorData] = useState<SensorData[]>([]); // Make this an array of SensorData
  const [email, setEmail] = useState<string | null>(null);
  const [sensors, setSensors] = useState<{ id: number; data: string[] }[]>([]); // Array to store connected sensors
  const { scannedData } = useLocalSearchParams(); // Retrieve the scanned data
  const [authToken, setAuthToken] = useState<string | null>(null); // State to store authToken

  const router = useRouter();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleScanner = () => {
    router.push("/cam");
  };

  useEffect(() => {
    const fetchedUser = async () => {
      const usernameToDisplay = await getFromSecureStore("username");
      const email = await getFromSecureStore("email");
      const token = await getFromSecureStore("authToken");
      setAuthToken(token);
      setEmail(email);
      setUsername(usernameToDisplay);
    };
    fetchedUser();
  }, []);

  // Update sensors when a new one is scanned
  useEffect(() => {
    if (scannedData) {
      setSensors((prevSensors) => [
        ...prevSensors,
        {
          id: prevSensors.length + 1,
          data: Array.isArray(scannedData) ? scannedData : [scannedData], // Ensure data is an array
        },
      ]);
    }
  }, [scannedData]);

  useEffect(() => {
    // Use an async function within useEffect
    const fetchData = async () => {
      try {
        const response = await axios.get("https://aquavitals.onrender.com/v1/user/home", {
          headers: {
            Authorization: `Bearer ${authToken}`, // Replace authToken with actual token
            "Content-Type": "application/json",
          },
        });
        setSensorData(response.data.sensors); // Handle the data
        console.log(response.data.sensors); // Log the fetched data to check

      } catch (err) {
        console.error("Error fetching sensor data:", err);
      }
    };

    if (authToken) {
      fetchData();
    }
  }, [authToken]); // Re-fetch if authToken changes

  return (
    <ImageBackground
      source={require("@/assets/images/login.jpg")}
      style={styles.image}
      resizeMode="cover"
    >
      {/* Sensor Count */}
      <View style={styles.sensorCountContainer}>
        <Text style={styles.sensorCountText}>
          Connected Sensors: {sensors.length}
        </Text>
      </View>

      {/* Render sensor data if available */}
      {sensorData.length > 0 &&
        sensorData.map((sensor: SensorData) => (
          <Card
            key={sensor.sensor_id}
            sensorId={sensor.sensor_id}
            sensorName={sensor.name}
            location={sensor.location} // Pass location here
          />
        ))}

      {/* Profile Icon */}
      <TouchableOpacity style={styles.profileIcon} onPress={toggleModal}>
        <Image
          source={require("@/assets/images/profile.webp")}
          style={styles.iconImage}
        />
      </TouchableOpacity>

      {/* Modal for Profile & Settings */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <BlurView style={styles.blurView} intensity={50}>
          <View style={styles.sidePanel}>
            <Text style={styles.panelHeader}>Hello, {username}!</Text>
            <TouchableOpacity
              style={styles.panelOption}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={styles.optionText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.panelOption}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={styles.optionText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sensorCountContainer: {
    position: "absolute",
    top: 30,
    alignSelf: "center",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
  },
  sensorCountText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  iconImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileIcon: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  blurView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  sidePanel: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  panelHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  panelOption: {
    marginVertical: 10,
  },
  optionText: {
    fontSize: 18,
    color: "#007BFF",
  },
});

export default Home;
