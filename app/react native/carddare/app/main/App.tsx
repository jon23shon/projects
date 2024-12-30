import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroScreen from '../screens/IntroScreen';
import PlayerSetupScreen from '../screens/PlayerSetupScreen';
import DifficultyScreen from '../screens/DifficultyScreen';
import GameScreen from '../screens/GameScreen';

export type RootStackParamList = {
  Intro: undefined;
  PlayerSetup: undefined;
  Difficulty: { players: { name: string; score: number }[] };
  Game: { players: { name: string; score: number }[]; difficulty: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro">
        <Stack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PlayerSetup" component={PlayerSetupScreen} options={{ title: 'Player Setup' }} />
        <Stack.Screen name="Difficulty" component={DifficultyScreen} options={{ title: 'Select Difficulty' }} />
        <Stack.Screen name="Game" component={GameScreen} options={{ title: 'Card Dare' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

