import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";

const StartScreen = () => {
  const navigation = useNavigation();
  const animatedValues = useRef([]).current;

  useEffect(() => {
    animatedValues.forEach((animatedValue, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

  const title = "Roulette Game";
  animatedValues.length = title.length;
  animatedValues.fill(0);
  animatedValues.forEach((_, i) => {
    animatedValues[i] = useRef(new Animated.Value(0)).current;
  });

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {title.split("").map((letter, index) => (
          <Animated.Text
            key={index}
            style={[
              styles.title,
              {
                transform: [
                  {
                    rotate: animatedValues[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "10deg"],
                    }),
                  },
                ],
              },
            ]}
          >
            {letter}
          </Animated.Text>
        ))}
      </View>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('SetupScreen')}
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('OptionsScreen')}
      >
        <Text style={styles.buttonText}>Options</Text>
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
  titleContainer: {
    flexDirection: "row",
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
  },
  button: {
    backgroundColor: "#000",
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: '50%', // Decreased width
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default StartScreen;
