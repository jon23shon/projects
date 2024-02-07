import 'dart:math';

import 'package:flutter/material.dart';

import '../dare.dart';
import 'ExclusiveDareCard.dart';
import 'PlayerCard.dart';

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
            child: ListView(
              children: widget.game.players
                  .map((player) => PlayerCard(player: player))
                  .toList(),
            ),
          ),
          ElevatedButton(
            onPressed: () {
              var player = widget.game.players[widget.game.currentPlayerIndex];
              var dare = player.dares[0];

              setState(() {
                if (Random().nextBool()) {
                  widget.game.completeDare(player, dare);
                  player.exclusiveDares.add(widget.game.exclusiveDares.removeAt(
                      Random().nextInt(widget.game.exclusiveDares.length)));
                } else {
                  widget.game.forfeitDare(player, dare);
                }
                player.dares.removeAt(0);
              });

              if (player.dares.isEmpty) {
                widget.game.nextPlayer();
              }
            },
            child: Text('Draw a dare'),
          ),
          Expanded(
            child: ListView(
              children: widget.game.players
                  .map((player) => Column(
                        children: player.exclusiveDares
                            .map((dare) => ExclusiveDareCard(dare: dare))
                            .toList(),
                      ))
                  .toList(),
            ),
          ),
        ],
      ),
    );
  }
}
