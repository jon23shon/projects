import 'dart:math';

import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Raffle-Based Dare Game',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: GameScreen(
        game: Game(
          players: [
            Player(name: 'Player 1', points: 100),
            Player(name: 'Player 2', points: 100),
            Player(name: 'Player 3', points: 100),
          ],
          exclusiveDares: [
            Dare(description: 'Exclusive dare 1', points: 20),
            Dare(description: 'Exclusive dare 2', points: 30),
            Dare(description: 'Exclusive dare 3', points: 40),
          ],
          dares: List.generate(
            20,
            (index) => Dare(
              description: 'Dare ${index + 1}',
              points: 10,
            ),
          ),
        ),
      ),
    );
  }
}

class Game {
  List<Player> players;
  List<Dare> dares;
  List<Dare> exclusiveDares;
  int currentPlayerIndex;

  Game({
    required this.players,
    required this.exclusiveDares,
    required this.dares,
  }) : currentPlayerIndex = 0 {
    for (var player in players) {
      player.dares = List.from(dares);
    }
  }

  void nextPlayer() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  }

  void completeDare(Player player, Dare dare) {
    player.points += dare.points;
    player.dares.remove(dare);
    if (player.points >= 200) {
      player.exclusiveDares.addAll(exclusiveDares);
      exclusiveDares.clear();
    }
  }

  void forfeitDare(Player player, Dare dare) {
    player.points -= dare.points;
    player.dares.remove(dare);
  }
}

class Player {
  String name;
  int points;
  List<Dare> dares;
  List<Dare> exclusiveDares;

  Player({
    required this.name,
    this.points = 100,
    this.dares = const [],
    this.exclusiveDares = const [],
  });
}

class Dare {
  String description;
  int points;

  Dare({required this.description, required this.points});
}

class PlayerCard extends StatefulWidget {
  final Player player;

  const PlayerCard({required this.player});

  @override
  _PlayerCardState createState() => _PlayerCardState();
}

class _PlayerCardState extends State<PlayerCard> {
  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        children: [
          ListTile(
            title: Text(widget.player.name),
            trailing: Text('${widget.player.points} points'),
          ),
          Column(
            children: widget.player.dares
                .map((dare) => DareCard(dare: dare))
                .toList(),
          ),
        ],
      ),
    );
  }
}

class DareCard extends StatelessWidget {
  final Dare dare;

  const DareCard({required this.dare});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        title: Text(dare.description),
        leading: Icon(Icons.assignment),
        trailing: Text('${dare.points} points'),
      ),
    );
  }
}

class ExclusiveDareCard extends StatelessWidget {
  final Dare dare;

  const ExclusiveDareCard({required this.dare});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        title: Text(dare.description),
        leading: Icon(Icons.star),
        trailing: Text('${dare.points} points'),
      ),
    );
  }
}

class GameScreen extends StatefulWidget {
  final Game game;

  const GameScreen({required this.game});

  @override
  _GameScreenState createState() => _GameScreenState();
}

class _GameScreenState extends State<GameScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Raffle-Based Dare Game'),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              itemCount: widget.game.players.length,
              itemBuilder: (context, index) {
                return PlayerCard(player: widget.game.players[index]);
              },
            ),
          ),
          ElevatedButton(
            onPressed: () {
              var player = widget.game.players[widget.game.currentPlayerIndex];
              var dare = player.dares.removeAt(0);

              if (Random().nextBool()) {
                widget.game.completeDare(player, dare);
                player.exclusiveDares.add(widget.game.exclusiveDares.removeAt(
                    Random().nextInt(widget.game.exclusiveDares.length)));
              } else {
                widget.game.forfeitDare(player, dare);
              }

              if (player.dares.isEmpty) {
                widget.game.nextPlayer();
              }

              setState(() {});
            },
            child: Text('Draw a dare'),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: widget.game.players.length,
              itemBuilder: (context, index) {
                var player = widget.game.players[index];
                return Column(
                  children: player.exclusiveDares
                      .map((dare) => ExclusiveDareCard(dare: dare))
                      .toList(),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
