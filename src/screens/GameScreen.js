import React from "react";
import { View, Text, Button } from "react-native";

const GameScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Game Screen</Text>
      <Button title="Go to Game Over" onPress={() => navigation.navigate('GameOverScreen')} />
    </View>
  );
};

export default GameScreen;