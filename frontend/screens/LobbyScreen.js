import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LobbyScreen = ({ route, navigation }) => {
  const { gameCode, username, isHost } = route.params;
  const [players, setPlayers] = useState([{ id: 'host', name: username }]);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/game/ws/${gameCode}/${username}/${username}`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'PLAYERS_UPDATE') {
        setPlayers(data.players);
      }
    };

    return () => ws.close();
  }, []);

  return (
    <LinearGradient colors={['#ABE098', '#A7DD99', '#81BD9F']} style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.roomCodeTitle}>room code:</Text>
      <View style={styles.codeContainer}>
        {gameCode.split('').map((char, index) => (
          <View key={index} style={styles.codeBox}>
            <Text style={styles.codeText}>{char}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sessionTitle}>session:</Text>
      <View style={styles.playersContainer}>
        {players.map((player) => (
          <View key={player.id} style={styles.playerItem}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {player.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text style={styles.playerName}>{player.name}</Text>
          </View>
        ))}
      </View>

      {isHost && (
        <TouchableOpacity style={styles.playButton}>
          <Text style={styles.playButtonText}   onPress={() => navigation.navigate('Game')} // Replace 'TargetScreen' with the name of your screen
>Play</Text>
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'SFCompactRounded',
  },
  roomCodeTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  codeBox: {
    width: 40,
    height: 40,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  codeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sessionTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  playersContainer: {
    alignItems: 'center',
  },
  playerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'SFCompactRounded',
  },
  playerName: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'SFCompactRounded',
  },
  playButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'SFCompactRounded',
    fontWeight: 'bold',
  },
});

export default LobbyScreen;