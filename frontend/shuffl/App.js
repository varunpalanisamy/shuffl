import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import GradientButton from './components/GradientButton';
import TextFieldComponent from './components/TextFieldComponent';

export default function App() {
  const [fontsLoaded] = useFonts({
    'SFCompactRounded': require('/Users/prasanthdendukuri/shuffl/frontend/shuffl/assets/fonts/SF-Compact-Rounded-Black.otf'),
  });

  const [showTextField, setShowTextField] = useState(false);
  const [code, setCode] = useState('');
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const animateTransition = (show) => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: show ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: show ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleJoinGame = () => {
    animateTransition(true);
    setShowTextField(true);
  };

  const handleBack = () => {
    animateTransition(false);
    setShowTextField(false);
  };

  const generateRandomCode = () => {
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCode(randomCode);
  };

  if (!fontsLoaded) {
    return null; // Or a loading spinner
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ABE098', '#A7DD99', '#81BD9F']}
        locations={[0.26, 0.29, 1.0]}
        style={styles.background}
      />
      <View style={styles.titleCard}>
        <Text style={styles.title}>shuffl</Text>
        <Image
          source={require('/Users/prasanthdendukuri/shuffl/frontend/shuffl/assets/aces.png')}
          style={styles.image}
        />
      </View>
      
      <Animated.View style={[
        styles.buttonsContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateX: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-300, 0]
          })}]
        }
      ]}>
        <GradientButton title="Create Game Session" onPress={handleJoinGame} />
        <GradientButton title="Join Game Session" onPress={handleJoinGame} />
      </Animated.View>

      <Animated.View style={[
        styles.textFieldContainer,
        {
          opacity: slideAnim,
          transform: [{ translateX: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [300, 0]
          })}]
        }
      ]}>
        <TextFieldComponent value={code} onChangeText={setCode} />
        <GradientButton title="Back" onPress={handleBack} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  titleCard: {
    marginBottom: 160,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'SFCompactRounded',
    fontSize: 90,
    color: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 25,
    tintColor: 'white',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 100,
    alignItems: 'center',
  },
  textFieldContainer: {
    position: 'absolute',
    bottom: 100,
    alignItems: 'center',
  },
});