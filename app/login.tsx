import {
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import MyButton from "@/components/MyButton";
import { saveToSecureStore } from "./util/secureStore";
const Login = () => {

  const [creds, setCreds] = useState({
   username: "",
    password: ""
  })
const onCLickToSignup = ()=>{
  router.push("/signup")
}
const onCLickToCam =() =>{
  router.push("/cam")
}
  const router = useRouter();
  const onLogin = async() => {
    console.log("username" ,creds?.username)
    console.log("password" ,creds?.password)
    await saveToSecureStore("username", creds.username);
    await saveToSecureStore("password", creds.password);
router.push("/home");
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
          
          onChangeText={(e)=> 
          {  console.log(e)
            setCreds(prev =>({...prev, username:e}))}}
        ></TextInput>

        <TextInput
          placeholder="Enter your password"
          style={styles.input}
          onChangeText={(e)=>{
            console.log(e)
             setCreds(prev =>({...prev, password:e}))}}

        ></TextInput>
        <MyButton title={"Login"} onPress={onLogin}></MyButton>
        <Text 
         style={{ color: "white",fontStyle:"italic", textAlign: "center", marginTop: 10 }}
        onPress={onCLickToSignup}>Don't have an account? Sign up here to login</Text>
          
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
