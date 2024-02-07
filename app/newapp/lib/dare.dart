import 'dart:math';

class Dare {
  final String description;
  final int points;
  final int penalty;

  Dare(
      {required this.description, required this.points, required this.penalty});
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

  bool canAccessExclusiveDares() {
    return points >= 200;
  }

  void addPoints(int amount) {
    points += amount;
  }

  void subtractPoints(int amount) {
    points -= amount;
  }
}

class Game {
  List<Player> players;
  List<Dare> dares;
  List<Dare> exclusiveDares;
  Random random;

  Game({
    required this.players,
    required this.dares,
    required this.exclusiveDares,
  }) : random = Random();

  get currentPlayerIndex => null;

  void startGame() {
    for (var player in players) {
      player.dares.clear();
      player.exclusiveDares.clear();
    }

    for (var dare in dares) {
      var playerIndex = random.nextInt(players.length);
      players[playerIndex].dares.add(dare);
    }
  }

  void completeDare(Player player, Dare dare) {
    player.addPoints(dare.points);
    player.dares.remove(dare);
  }

  void forfeitDare(Player player, Dare dare) {
    player.subtractPoints(dare.penalty);
    player.dares.remove(dare);
  }

  void addExclusiveDare(Player player) {
    if (player.canAccessExclusiveDares()) {
      var dare = exclusiveDares.removeAt(random.nextInt(exclusiveDares.length));
      player.exclusiveDares.add(dare);
    }
  }

  void addPlayer(Player player) {
    players.add(player);
  }

  void nextPlayer() {}
}

void main() {
  var dare1 = Dare(
    description: 'Do 10 push-ups',
    points: 10,
    penalty: -5,
  );

  var dare2 = Dare(
    description: 'Eat a hot pepper',
    points: 15,
    penalty: -10,
  );

  var dare3 = Dare(
    description: 'Sing a song in public',
    points: 20,
    penalty: -15,
  );

  var dares = [dare1, dare2, dare3];

  var exclusiveDare1 = Dare(
    description: 'Climb a mountain',
    points: 50,
    penalty: -30,
  );

  var exclusiveDare2 = Dare(
    description: 'Swim with sharks',
    points: 75,
    penalty: -50,
  );

  var exclusiveDares = [exclusiveDare1, exclusiveDare2];

  var player1 = Player(name: 'Player 1');
  var player2 = Player(name: 'Player 2');
  var player3 = Player(name: 'Player 3');

  var players = [player1, player2, player3];

  var game =
      Game(players: players, dares: dares, exclusiveDares: exclusiveDares);

  game.startGame();

  for (var i = 0; i < 10; i++) {
    var player = players[i % players.length];
    var dare = player.dares[0];

    print('${player.name} has drawn a dare: ${dare.description}');

    // Simulate dare completion or forfeit
    if (Random().nextBool()) {
      game.completeDare(player, dare);
      print(
          '${player.name} has completed the dare and earned ${dare.points} points');
    } else {
      game.forfeitDare(player, dare);
      print(
          '${player.name} has failed to complete the dare and lost ${dare.penalty} points');
    }

    if (player.canAccessExclusiveDares()) {
      game.addExclusiveDare(player);
      print(
          '${player.name} has earned an exclusive dare: ${player.exclusiveDares[0].description}');
    }

    print('${player.name}\'s points: ${player.points}');
    print('');
  }

  var winner = players.reduce((player1, player2) =>
      player1.points > player2.points ? player1 : player2);

  print('The winner is ${winner.name} with ${winner.points} points!');
}
