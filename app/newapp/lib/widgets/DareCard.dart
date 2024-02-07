import 'package:flutter/material.dart';

import '../dare.dart';

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
