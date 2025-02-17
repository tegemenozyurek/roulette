import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import StartScreen from "../screens/StartScreen";
import SetupScreen from "../screens/SetupScreen";
import GameScreen from "../screens/GameScreen";
import OptionsScreen from "../screens/OptionsScreen";
import GameOverScreen from "../screens/GameOverScreen";

const Stack = createStackNavigator();

const linking = {
  prefixes: ['http://localhost:19006'], // Adjust this to your development URL
  config: {
    screens: {
      StartScreen: '',
      SetupScreen: 'setup',
      GameScreen: 'game',
      OptionsScreen: 'options',
      GameOverScreen: 'game-over',
    },
  },
};

const AppNavigator = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="StartScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="SetupScreen" component={SetupScreen} />
        <Stack.Screen name="GameScreen" component={GameScreen} />
        <Stack.Screen name="OptionsScreen" component={OptionsScreen} />
        <Stack.Screen name="GameOverScreen" component={GameOverScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;