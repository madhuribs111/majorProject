import React from "react"
import {Stack} from "expo-router"
import { StatusBar } from "expo-status-bar"

const RootLayout =()=>{
  return (
    <>
  <Stack>
<Stack.Screen name = "index"/>
<Stack.Screen name="login" />
<Stack.Screen name = "signup" /> 
<Stack.Screen name="home" /> 
<Stack.Screen name="cam" />
<Stack.Screen name="scan" /> 
  </Stack>
  <StatusBar backgroundColor="white" style="dark"/>
  </>
  )
}
export default RootLayout