import React, { useRef, useState } from 'react';
import { Animated, View, FlatList, StyleSheet, useWindowDimensions } from 'react-native';
import slides from '../constants/slides.js';
import OnBoardingItem from './onBoardingItem';
import GradientText from './gradientText';
import CustomButton from './customButton.jsx';
import Paginator from './paginator';
import { router } from 'expo-router';

const OnBoarding = () => {
  const { width, height } = useWindowDimensions(); // Fetching dynamic screen width and height
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  // Update the handlePress function to use router.push for navigation
  const handlePress = () => {
    router.push('/login'); // Using router.push() for navigation
  };

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0]?.index || 0);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={styles.container}>
      {/* Section 1: Gradient Text */}
      <View style={[styles.headerContainer, { marginTop: height * 0.1 }]}>
        <GradientText Text="AQUAVITALS" style={styles.gradientText} />
      </View>

      {/* Section 2: FlatList */}
      <View style={styles.listContainer}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnBoardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
          ref={slidesRef}
        />
      </View>

      {/* Section 3: Custom Button */}
      {currentIndex === slides.length - 1 && (
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Get Started"
            handlePress={handlePress}
            containerStyle={styles.button}
            textStyles={styles.buttonText}
            isLoading={false} // Set to true if you want to show loading state
          />
        </View>
      )}

      {/* Section 4: Paginator (Always at the bottom) */}
      <View style={styles.paginatorContainer}>
        <Paginator data={slides} scrollX={scrollX} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  gradientText: {
    marginTop: 10,
    marginBottom: 10,
  },
  listContainer: {
    flex: 0.8,
    width: '100%',
  },
  buttonContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 28,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#007BFF', // Example button color
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  paginatorContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OnBoarding;
