import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type PlayerSetupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PlayerSetup'>;

type Props = {
  navigation: PlayerSetupScreenNavigationProp;
};

const PlayerSetupScreen = ({ navigation }: Props) => {
  const [numPlayers, setNumPlayers] = useState(2);
  const [playerNames, setPlayerNames] = useState<string[]>(['', '']);

  const updatePlayerName = (index: number, name: string) => {
    const newPlayerNames = [...playerNames];
    newPlayerNames[index] = name;
    setPlayerNames(newPlayerNames);
  };

  const addPlayer = () => {
    setNumPlayers(numPlayers + 1);
    setPlayerNames([...playerNames, '']);
  };

  const removePlayer = () => {
    if (numPlayers > 2) {
      setNumPlayers(numPlayers - 1);
      setPlayerNames(playerNames.slice(0, -1));
    }
  };

  const startGame = () => {
    const players = playerNames.map(name => ({ name, score: 100 }));
    navigation.navigate('Difficulty', { players });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Player Setup</Text>
      {playerNames.map((name, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={`Player ${index + 1} Name`}
          value={name}
          onChangeText={(text) => updatePlayerName(index, text)}
          accessibilityLabel={`Enter name for Player ${index + 1}`}
        />
      ))}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={removePlayer} disabled={numPlayers <= 2} accessibilityLabel="Remove player">
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={addPlayer} accessibilityLabel="Add player">
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.startButton} onPress={startGame} accessibilityLabel="Start game">
        <Text style={styles.startButtonText}>Start Game</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: 40,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PlayerSetupScreen;

