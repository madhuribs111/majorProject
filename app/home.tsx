import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { getFromSecureStore } from "./util/secureStore";
import { BlurView } from "expo-blur"; // Install expo-blur
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";
const Home = () => {
 type Sensor={
 id: number,
  data: string[]   
  }
  const [isModalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [sensors, setSensors] = useState<Sensor[]>([]); // Array to store connected sensors
  const { scannedData } = useLocalSearchParams(); // Retrieve the scanned data
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

   

      {/* Profile Icon */}
      <TouchableOpacity style={styles.profileIcon} onPress={toggleModal}>
        <Image
          source={require("@/assets/images/profile.webp")}
          style={styles.iconImage}
        />
      </TouchableOpacity>

      {/* Display Sensors Data */}
      {sensors.length > 0 ? (
        <View style={styles.scannedDataContainer}>
          <FlatList
            data={sensors}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.sensorContainer}>
                <Text style={styles.scannedDataTitle}>Sensor {item.id}:</Text>
                <Text style={styles.scannedDataText}>{item.data}</Text>
              </View>
            )}
          />
          <Text onPress={handleScanner} style={styles.subText}>
            Scan here to connect another sensor
          </Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.mainText}>
            Oops! Seems like you're not connected to any sensors.
          </Text>
          <Text onPress={handleScanner} style={styles.subText}>
            Scan here to connect
          </Text>
        </View>
      )}

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
  sensorList: {
    marginTop: 100,
    flex: 1,
    width: "90%",
  },  bottomContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
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
    top: 30
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
  container: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 50
  },
  mainText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",

  },
  subText: {
    fontSize: 16,
    color: "orange",
    fontStyle: "italic",
    textAlign: "center",
  },
  scannedDataContainer: {
    marginTop: 50,

    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  sensorContainer: {
    marginTop: 50,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    width: "100%",
  },
  scannedDataTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "orange",
    marginBottom: 5,
  },
  scannedDataText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
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
