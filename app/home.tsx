import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet, Image,
  ImageBackground, 
  TouchableOpacity, Modal

} from "react-native";
import { getFromSecureStore } from "./util/secureStore";
import { BlurView } from "expo-blur"; // Install expo-blur
//import { Ionicons } from "@expo/vector-icons"; // For profile icon
import { useRouter } from "expo-router";
import QRCode from "react-native-qrcode-svg";
//import { BarCodeScanner } from "expo-barcode-scanner";

const Home = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState<string |null>(null)
  const router = useRouter();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
const handleScanner  =()=>{
  router.push("/cam")
}
useEffect(()=>{
  const fetchedUser= async()=>{
    const usernameToDisplay = await getFromSecureStore("username");
    console.log(usernameToDisplay);
    setUsername(usernameToDisplay);
  
  }
fetchedUser();
},[])
  return (
    <ImageBackground 
      source={require("@/assets/images/login.jpg")}
      style={styles.image}
      resizeMode="cover"
    >
      {/* Profile Icon */}
      <TouchableOpacity
        style={styles.profileIcon}
        onPress={toggleModal}
      
      >
        <Image source={require("@/assets/images/profile.webp")}  style={styles.iconImage}></Image>
       
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.mainText}>
          "Oops! Seems like you're not connected to any sensors."
        </Text>
        <Text onPress = {handleScanner}
        style={styles.subText}>Scan here to connect</Text>
      </View>

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
               // router.navigate("/profile");
              }}
            >
              <Text style={styles.optionText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.panelOption}
              onPress={() => {
                setModalVisible(false);
               // router.navigate("/settings");
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
  iconImage: {
    width: 40,
    height: 40,
    borderRadius: 20, // Makes the image circular,
  },
  profileIcon: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  container: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  mainText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: "orange",
    fontStyle: "italic",
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