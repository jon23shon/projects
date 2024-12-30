import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type GameScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Game'>;
type GameScreenRouteProp = RouteProp<RootStackParamList, 'Game'>;

type Props = {
  navigation: GameScreenNavigationProp;
  route: GameScreenRouteProp;
};

const GameScreen = ({ route }: Props) => {
  const { players: initialPlayers, difficulty } = route.params;
  const [players, setPlayers] = useState(initialPlayers);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentDare, setCurrentDare] = useState('');

  const dares = {
    Easy: [
      'Sing a nursery rhyme',
      'Do 5 jumping jacks',
      'Tell a joke',
      'Spin around 3 times',
      'Make a funny face',
    ],
    Medium: [
      'Sing a popular song for 30 seconds',
      'Do 10 push-ups',
      'Tell a story in a made-up language',
      'Balance on one foot for 30 seconds',
      'Do your best impression of a celebrity',
    ],
    Hard: [
      'Perform a 1-minute stand-up comedy routine',
      'Do 20 burpees',
      'Recite the alphabet backwards',
      'Hold a plank position for 1 minute',
      'Perform a magic trick',
    ],
  };

  useEffect(() => {
    drawNewDare();
  }, [currentPlayerIndex]);

  const drawNewDare = () => {
    const difficultyDares = dares[difficulty as keyof typeof dares];
    const randomDare = difficultyDares[Math.floor(Math.random() * difficultyDares.length)];
    setCurrentDare(randomDare);
  };

  const completeDare = (success: boolean) => {
    const points = success ? 10 : -5;
    const updatedPlayers = [...players];
    updatedPlayers[currentPlayerIndex].score += points;
    setPlayers(updatedPlayers);
    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Card Dare - {difficulty}</Text>
      {players.map((player, index) => (
        <Text key={index} style={styles.playerScore}>
          {player.name}: {player.score} points
        </Text>
      ))}
      <View style={styles.card}>
        <Text style={styles.cardText}>{currentDare}</Text>
      </View>
      <Text style={styles.currentPlayer}>
        Current Player: {players[currentPlayerIndex].name}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.successButton]}
          onPress={() => completeDare(true)}
          accessibilityLabel="Complete dare successfully"
        >
          <Text style={styles.buttonText}>Complete Dare</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.failButton]}
          onPress={() => completeDare(false)}
          accessibilityLabel="Fail to complete dare"
        >
          <Text style={styles.buttonText}>Fail Dare</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  playerScore: {
    fontSize: 18,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    textAlign: 'center',
  },
  currentPlayer: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    padding: 15,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  successButton: {
    backgroundColor: '#4CAF50',
  },
  failButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameScreen;

