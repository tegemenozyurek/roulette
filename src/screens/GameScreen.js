import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Vibration } from "react-native";
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

const GameScreen = ({ navigation, route }) => {
  const { chamber, randomPositions } = route.params;
  const [countdown, setCountdown] = useState(3);
  const [showButton, setShowButton] = useState(false);
  const [currentCount, setCurrentCount] = useState(-1);
  const [backgroundColor, setBackgroundColor] = useState('#000000');

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      return () => clearTimeout(timer);
    } else {
      setShowButton(true);
    }
  }, [countdown]);

  const flashScreen = async () => {
    setBackgroundColor('#FFFFFF'); // Parlak beyaz flash
    await new Promise(resolve => setTimeout(resolve, 50));
    setBackgroundColor('#FF4500'); // Turuncu-kırmızı
    await new Promise(resolve => setTimeout(resolve, 50));
    setBackgroundColor('#FF0000'); // Kırmızı
  };

  const handleShoot = async () => {
    if (currentCount < chamber - 1) {
      if (randomPositions.includes(currentCount + 1)) {
        // Silah patlama efekti
        await flashScreen();
        
        // Güçlü titreşim paterni
        Vibration.vibrate([
          0, // Hemen başla
          100, // 100ms güçlü titreşim
          50, // 50ms duraklama
          200, // 200ms güçlü titreşim
          100, // 100ms duraklama
          300  // 300ms güçlü titreşim
        ], false);

        // Haptic feedback ile ekstra etki
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        await new Promise(resolve => setTimeout(resolve, 750));
        
        // Titreşimi durdur ve ekranı normale döndür
        Vibration.cancel();
        setBackgroundColor('#000000');
      } else {
        // Boş tetik efekti
        setBackgroundColor('#1A1A1A'); // Hafif gri flash
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        await new Promise(resolve => setTimeout(resolve, 100));
        setBackgroundColor('#000000');
      }
      setCurrentCount(currentCount + 1);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {showButton ? (
        <>
          <Text style={styles.chamberText}>{currentCount + 1}/{chamber}</Text>
          <Text style={styles.positionsText}>Count at positions: {randomPositions.join(', ')}</Text>
          <TouchableOpacity style={styles.button} onPress={handleShoot}>
            <Text style={styles.buttonText}>SHOOT!</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.countdown}>{countdown}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chamberText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  positionsText: {
    fontSize: width * 0.045,
    color: '#ffffff',
    marginBottom: 20,
  },
  countdown: {
    fontSize: width * 0.5,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 20,
  },
  button: {
    width: width * 0.8,
    height: height * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    borderWidth: 2,
    borderColor: '#ffffff',
    margin: 10,
    borderRadius: 10,
    position: 'absolute',
    bottom: height * 0.1,
  },
  buttonText: {
    fontSize: width * 0.15,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default GameScreen;