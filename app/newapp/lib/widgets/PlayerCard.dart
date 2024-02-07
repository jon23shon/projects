import 'package:flutter/material.dart';

import '../dare.dart';
import 'DareCard.dart';

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
