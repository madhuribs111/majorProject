import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { Card } from "../components/card.jsx";
import FloatingActionButton from "../components/floatingButton.jsx";
import { getFromSecureStore } from "./util/secureStore";
import { BlurView } from "expo-blur";
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
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [email, setEmail] = useState<string | null>(null);
  const [sensors, setSensors] = useState<{ id: number; data: string[] }[]>([]);
  const { scannedData } = useLocalSearchParams();
  const [authToken, setAuthToken] = useState<string | null>(null);

  const router = useRouter();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleScanner = () => {
    router.push("/cam");
  };
  
  const handleCardClick = ()=>{
    router.navigate("/sensor")

  }
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

  useEffect(() => {
    if (scannedData) {
      setSensors((prevSensors) => [
        ...prevSensors,
        {
          id: prevSensors.length + 1,
          data: Array.isArray(scannedData) ? scannedData : [scannedData],
        },
      ]);
    }
  }, [scannedData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://aquavitals.onrender.com/v1/user/home", {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });
        setSensorData(response.data.sensors);
        console.log(response.data.sensors);
      } catch (err) {
        console.error("Error fetching sensor data:", err);
      }
    };

    if (authToken) {
      fetchData();
    }
  }, [authToken]);

  return (
    
    <ImageBackground
      source={require("@/assets/images/login.jpg")}
      style={styles.image}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.sensorCountContainer}>
          <Text style={styles.sensorCountText}>
            Connected Sensors: {sensorData.length}
          </Text>
        </View>
        {sensorData.length > 0 &&
          sensorData.map((sensor: SensorData) => (
            <Card
              key={sensor.sensor_id}
              sensorId={sensor.sensor_id}
              sensorName={sensor.name}
              location={sensor.location}
              onClick={handleCardClick}
              
            />
          ))}
      </ScrollView>

      <TouchableOpacity style={styles.profileIcon} onPress={toggleModal}>
        <Image
          source={require("@/assets/images/profile.webp")}
          style={styles.iconImage}
        />
      </TouchableOpacity>

      <FloatingActionButton handleScan={handleScanner} />

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
    marginVertical: 10,
    alignSelf: "center",
    top: 5,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    padding: 10,
  },
  sensorCountText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  scrollContainer: {
    flexGrow: 1,
    top: 40,
    alignItems: "center",
    paddingBottom: 20,
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
