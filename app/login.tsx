import {
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  StyleSheet,
} from "react-native";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import MyButton from "@/components/MyButton";
import { saveToSecureStore } from "./util/secureStore";

export const API_URL = "https://aquavitals.onrender.com/v1";
const Login = () => {
  // const [creds, setCreds] = useState({
  //  username: "",
  //   password: ""
  // })
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onCLickToSignup = () => {
    router.push("/signup");
  };
  const onCLickToCam = () => {
    router.push("/cam");
  };
  const router = useRouter();
  //   const onLogin = async() => {
  //     console.log("username" ,username)
  //     console.log("password" ,password)
  // try{    await axios.post(`${API_URL}/user/login`, { username, password });
  //     await saveToSecureStore("username", username);
  //     await saveToSecureStore("password", password);}catch(err){
  //       console.log(err)
  //     }
  // router.push("/home");
  //   };
  const onLogin = async () => {
    console.log("username", username);
    console.log("password", password);

    try {
      // Send login request to the backend
      const response = await axios.post(`${API_URL}/user/login`, {
        username,
        password,
      });

      if (response.data) {
        // Save credentials securely if login is successful
        await saveToSecureStore("username", username);
        await saveToSecureStore("password", password);
        await saveToSecureStore("authToken", response.data.authToken)
        await saveToSecureStore("email", response.data.email)
        console.log("userename",username);
        router.push("/home"); // Navigate to home
      } else {
        // Handle unexpected response
        alert("Invalid login. Please try again.");
      }
    } catch (err) {
     // console.error(err);
      // Display alert for error scenarios
      // if (err.response?.data?.message) {
      //   alert(err.response.data.message); // Backend-provided error message
      // } else {
      alert("Invalid login. Please try again.");
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/login.jpg")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <TextInput
          placeholder="Enter your username"
          style={styles.input}
          onChangeText={(e) => {
            console.log(e);
            setUsername(e);
          }}
        ></TextInput>

        <TextInput
          placeholder="Enter your password"
          style={styles.input}
          onChangeText={(e) => {
            console.log(e);
            setPassword(e);
          }}
        ></TextInput>
        <MyButton title={"Login"} onPress={onLogin}></MyButton>
        <Text
          style={{
            color: "white",
            fontStyle: "italic",
            textAlign: "center",
            marginTop: 10,
          }}
          onPress={onCLickToSignup}
        >
          Don't have an account? Sign up here to login
        </Text>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    paddingHorizontal: 20,
    gap: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent for readability
  },
});

export default Login;
