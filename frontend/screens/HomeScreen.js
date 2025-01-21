import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, Animated, Alert, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import GradientButton from '../components/GradientButton';

export default function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    'SFCompactRounded': require('../assets/fonts/SF-Compact-Rounded-Black.otf'),
  });

  const [showCreateGame, setShowCreateGame] = useState(false);
  const [showJoinGame, setShowJoinGame] = useState(false);
  const [username, setUsername] = useState('');
  const [gameCode, setGameCode] = useState('');
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const animateTransition = (show, isJoin) => {
    setShowCreateGame(!isJoin && show);
    setShowJoinGame(isJoin && show);
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

  const handleCreateGame = async () => {
    if (!username.trim()) {
      Alert.alert('Error', 'Please enter a username');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/game/create-game', {
        method: 'POST'
      });
      const data = await response.json();
      navigation.navigate('Lobby', {
        gameCode: data.game_code,
        username,
        isHost: true
      });
    } catch (error) {
      console.error('Error creating game:', error);
    }
  };

  const handleJoinGame = () => {
    if (!username.trim() || !gameCode.trim()) {
      Alert.alert('Error', 'Please enter both username and game code');
      return;
    }
    
    navigation.navigate('Lobby', {
      gameCode: gameCode,
      username,
      isHost: false
    });
  };

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;  // Display loading text while fonts load
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ABE098', '#A7DD99', '#81BD9F']}
        style={styles.background}
      />
      <View style={styles.titleCard}>
        <Text style={styles.title}>shuffl</Text>
        <Image
          source={require('../assets/aces.png')}
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
        <GradientButton title="Create Game Session" onPress={() => animateTransition(true, false)} />
        <GradientButton title="Join Game Session" onPress={() => animateTransition(true, true)} />
      </Animated.View>

      <Animated.View style={[styles.formContainer, { opacity: slideAnim }]}>
        {showCreateGame && (
          <>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter Username"
              placeholderTextColor="#fff"
            />
            <GradientButton title="Create" onPress={handleCreateGame} style={styles.smallerButton} />
          </>
        )}
        
        {showJoinGame && (
          <>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter Username"
              placeholderTextColor="#fff"
            />
            <TextInput
              style={styles.input}
              value={gameCode}
              onChangeText={setGameCode}
              placeholder="Enter Game Code"
              placeholderTextColor="#fff"
            />
            <GradientButton title="Join" onPress={handleJoinGame} style={styles.smallerButton} />
          </>
        )}
        <GradientButton title="Back" onPress={() => animateTransition(false)} style={styles.smallerButton} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  titleCard: {
    marginTop: 60,
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
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  formContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 10,
    paddingHorizontal: 15,
    color: '#fff',
    fontFamily: 'SFCompactRounded',
    fontSize: 16,
  },
  smallerButton: {
    width: 150,
    padding: 10,
  },
});

