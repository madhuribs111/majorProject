import React from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';

import { LinearGradient } from 'expo-linear-gradient';

const GradientText = (props) => {
  const width = Dimensions.get("window").width;

  return (
    <View className={`{props.style}`}>
        <MaskedView
          maskElement={
            <View style={{ width }}>
              <Text style={[styles.text, { fontSize: 48 }]}>
                {props.Text}
              </Text>
            </View>
          }
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['#2C7CE6', '#242E42']}
            style={{ width }}
          >
            {/* Placeholder Text to define the gradient area */}
            <Text className="mt-10" style={[styles.text, { opacity: 0, fontSize: 48 }]}>
              {props.Text}
            </Text>
          </LinearGradient>
        </MaskedView>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 10
  },
});

export default GradientText;