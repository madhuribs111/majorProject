import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import MyButton from "@/components/MyButton";
import axios from "axios";
import { API_URL } from "./login";
import { useState } from "react";
const SignUp = () => {
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const router = useRouter();
  const onCLickToLogin = () => {
    router.navigate("/login");
  };
  const onRegister = async () => {
    try {
      await axios.post(`${API_URL}/user/create`, { username, email, password });
      router.navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ImageBackground
      source={require("@/assets/images/login.jpg")}
      style={styles.backgroundImage}
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
          placeholder="Enter your email"
          style={styles.input}
          onChangeText={(e) => {
            console.log(e);
            setEmail(e);
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

        <MyButton title={"Register"} onPress={onRegister}></MyButton>
        <Text
          style={{
            color: "white",
            fontStyle: "italic",
            textAlign: "center",
            marginTop: 10,
          }}
          onPress={onCLickToLogin}
        >
          Already have an account? CLick here to login
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
  button: {
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
export default SignUp;
