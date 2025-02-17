import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OptionsScreen = ({ navigation }) => {
  const [music, setMusic] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [vibrationEffects, setVibrationEffects] = useState(true);
  const [flashEffects, setFlashEffects] = useState(true);

  useEffect(() => {
    loadOptions();
  }, []);

  const loadOptions = async () => {
    try {
      const musicValue = await AsyncStorage.getItem('music');
      const soundEffectsValue = await AsyncStorage.getItem('soundEffects');
      const vibrationEffectsValue = await AsyncStorage.getItem('vibrationEffects');
      const flashEffectsValue = await AsyncStorage.getItem('flashEffects');

      if (musicValue !== null) setMusic(JSON.parse(musicValue));
      if (soundEffectsValue !== null) setSoundEffects(JSON.parse(soundEffectsValue));
      if (vibrationEffectsValue !== null) setVibrationEffects(JSON.parse(vibrationEffectsValue));
      if (flashEffectsValue !== null) setFlashEffects(JSON.parse(flashEffectsValue));
    } catch (error) {
      console.error("Failed to load options", error);
    }
  };

  const saveOption = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Failed to save option", error);
    }
  };

  const toggleMusic = () => {
    const newValue = !music;
    setMusic(newValue);
    saveOption('music', newValue);
  };

  const toggleSoundEffects = () => {
    const newValue = !soundEffects;
    setSoundEffects(newValue);
    saveOption('soundEffects', newValue);
  };

  const toggleVibrationEffects = () => {
    const newValue = !vibrationEffects;
    setVibrationEffects(newValue);
    saveOption('vibrationEffects', newValue);
  };

  const toggleFlashEffects = () => {
    const newValue = !flashEffects;
    setFlashEffects(newValue);
    saveOption('flashEffects', newValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Options Screen</Text>
      <View style={styles.optionContainer}>
        <Text style={styles.optionTitle}>Music</Text>
        <TouchableOpacity 
          style={[styles.button, !music && styles.buttonOff]} 
          onPress={toggleMusic}
        >
          <Text style={styles.buttonText}>{music ? "ON" : "OFF"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.optionContainer}>
        <Text style={styles.optionTitle}>Sound Effects</Text>
        <TouchableOpacity 
          style={[styles.button, !soundEffects && styles.buttonOff]} 
          onPress={toggleSoundEffects}
        >
          <Text style={styles.buttonText}>{soundEffects ? "ON" : "OFF"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.optionContainer}>
        <Text style={styles.optionTitle}>Vibration Effects</Text>
        <TouchableOpacity 
          style={[styles.button, !vibrationEffects && styles.buttonOff]} 
          onPress={toggleVibrationEffects}
        >
          <Text style={styles.buttonText}>{vibrationEffects ? "ON" : "OFF"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.optionContainer}>
        <Text style={styles.optionTitle}>Flash Effects</Text>
        <TouchableOpacity 
          style={[styles.button, !flashEffects && styles.buttonOff]} 
          onPress={toggleFlashEffects}
        >
          <Text style={styles.buttonText}>{flashEffects ? "ON" : "OFF"}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
        style={styles.saveButton} 
        onPress={() => navigation.navigate('StartScreen')}
      >
        <Text style={styles.saveButtonText}>Save</Text>
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
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    width: '80%', // Adjust width to align items properly
  },
  optionTitle: {
    fontSize: 18,
    color: "#fff",
    marginRight: 20,
    flex: 1, // Align titles to the left
  },
  button: {
    backgroundColor: "#000",
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    width: '25%', // Decreased width
  },
  buttonOff: {
    borderColor: "#000", // Black border when OFF
  },
  saveButton: {
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
  buttonText: {
    color: "#fff", // Updated to white
    fontSize: 18, 
    fontWeight: "bold",
  },
  saveButtonText: {
    color: "#fff", // White text for the Save button
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default OptionsScreen;