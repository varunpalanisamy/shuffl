import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Import both screens
import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import LobbyScreen from '../screens/LobbyScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Game" component={GameScreen} options={{ title: 'Play Game' }} />
        <Stack.Screen name = "Lobbdy" component = {LobbyScreen} options = {{title: 'Lobby Screen'}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
