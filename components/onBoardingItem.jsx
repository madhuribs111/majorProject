import { Text, View, Image, useWindowDimensions, StyleSheet } from 'react-native';
import React from 'react';

const OnBoardingItem = ({ item }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image
          source={item.image}
          style={[styles.image, { width: width * 0.8 }]}
        />
      </View>

      {/* Text Container */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,  // Add some padding at the bottom for spacing
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    maxHeight: 250,  // Limit the height of the image
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
    width: '100%', // Ensure the text container uses full width
    maxWidth: 300, // Set a max width to avoid text stretching on wide screens
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,  // Add spacing between title and description
  },
  description: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
});

export default OnBoardingItem;
