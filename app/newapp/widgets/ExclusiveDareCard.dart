import 'package:flutter/material.dart';

import '../lib/dare.dart';

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
