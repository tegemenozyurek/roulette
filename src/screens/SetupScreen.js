import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import * as Haptics from 'expo-haptics';

const SetupScreen = ({ navigation }) => {
  const [chamber, setChamber] = useState(5);
  const [count, setCount] = useState(1);

  const handleChamberChange = (value) => {
    setChamber(value);
    setCount(1); // Reset count to 1 when chamber changes
  };

  const handleGoPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const positions = Array.from({ length: chamber }, (_, i) => i);
    const randomPositions = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * positions.length);
      randomPositions.push(positions.splice(randomIndex, 1)[0]);
    }
    navigation.navigate('GameScreen', { chamber, randomPositions });
  };

  const handleGoBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('StartScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setup</Text>
      <View style={styles.sliderContainer}>
        <Text style={styles.optionTitle}>Chamber: {chamber}</Text>
        <Slider
          style={styles.slider}
          minimumValue={5}
          maximumValue={9}
          step={1}
          value={chamber}
          onValueChange={handleChamberChange}
          minimumTrackTintColor="#8B0000" // Blood red color
          thumbTintColor="#8B0000" // Blood red color
        />
      </View>
      <View style={styles.sliderContainer}>
        <Text style={styles.optionTitle}>Count: {count}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={chamber - 1}
          step={1}
          value={count}
          onValueChange={setCount}
          minimumTrackTintColor="#8B0000" // Blood red color
          thumbTintColor="#8B0000" // Blood red color
        />
      </View>
      <TouchableOpacity 
        style={styles.goButton} 
        onPress={handleGoPress}
      >
        <Text style={styles.goButtonText}>Go</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.goBackButton} 
        onPress={handleGoBack}
      >
        <Text style={styles.goBackButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
  },
  sliderContainer: {
    width: '80%',
    marginBottom: 20,
  },
  optionTitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  goButton: {
    backgroundColor: "#000", // Black background
    borderColor: "#fff", // White border
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: '50%', // Adjusted width
    alignItems: "center",
  },
  goButtonText: {
    color: "#fff", // White text for the Go button
    fontSize: 20,
    fontWeight: "bold",
  },
  goBackButton: {
    backgroundColor: "#000", // Black background
    borderColor: "#fff", // White border
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: '50%', // Adjusted width
    alignItems: "center",
  },
  goBackButtonText: {
    color: "#fff", // White text for the Go Back button
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default SetupScreen;