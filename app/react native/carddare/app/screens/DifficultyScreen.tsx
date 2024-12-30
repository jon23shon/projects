import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type DifficultyScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Difficulty'>;
type DifficultyScreenRouteProp = RouteProp<RootStackParamList, 'Difficulty'>;

type Props = {
  navigation: DifficultyScreenNavigationProp;
  route: DifficultyScreenRouteProp;
};

const DifficultyScreen = ({ navigation, route }: Props) => {
  const { players } = route.params;

  const selectDifficulty = (difficulty: string) => {
    navigation.navigate('Game', { players, difficulty });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Difficulty</Text>
      {['Easy', 'Medium', 'Hard'].map((difficulty) => (
        <TouchableOpacity
          key={difficulty}
          style={styles.button}
          onPress={() => selectDifficulty(difficulty)}
          accessibilityRole="button"
          accessibilityLabel={`Select ${difficulty} difficulty`}
        >
          <Text style={styles.buttonText}>{difficulty}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DifficultyScreen;

