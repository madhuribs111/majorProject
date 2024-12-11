import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // You can use any icon package

const FloatingActionButton = (props) => {
  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.fab} onPress={props.handleScan}>
        <MaterialIcons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end', 
    },
    fab: {
      position: 'absolute',
      bottom: 20,
      right: 20,  
      backgroundColor: '#6200ea',
      width: 60,
      height: 60,
      borderRadius: 30, 
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5, 
    },
  });
  

export default FloatingActionButton;
