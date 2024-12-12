import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const CustomButton = ({ title, handlePress, containerStyle, textStyles, isLoading }) => {
  return (
    <TouchableOpacity 
      disabled={isLoading}
      onPress={handlePress}
      activeOpacity={0.7}
      style={[styles.button, containerStyle, isLoading && styles.disabledButton]}
    >
      <Text style={[styles.text, textStyles]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFC700',
    borderRadius: 12,
    minHeight: 62,
    minWidth: 'fit-content',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  text: {
    color: '#000', // Replace with your desired text color
    fontWeight: '600',
    fontSize: 18,
  },
});

export default CustomButton;
