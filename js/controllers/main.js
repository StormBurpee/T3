// Generated by CoffeeScript 1.6.3
(function() {
  app.controller('MainCtrl', function($scope, T3Factory, $location, $routeParams) {
    var checkUltimateWinner, checkWinRow, fullBoard, newGame, promise;
    $scope.$watch('game', function() {
      var _ref;
      if (((_ref = $scope.game) != null ? _ref.started : void 0) === 'started') {
        $scope.game.winner = checkUltimateWinner($scope.game);
        if ($scope.game.winner) {
          $scope.game.status = "Player " + $scope.game.winner + " wins!";
          $scope.game.turn = 3;
        }
        if (!$scope.game.winner && fullBoard($scope.game)) {
          $scope.game.tie = true;
          return $scope.game.status = "OMG -- It's a tie!";
        }
      }
    }, true);
    newGame = function() {
      var game, i, x, _i;
      game = {
        turn: 1,
        winner: false,
        started: 'started',
        board_turn: -1,
        name1: "Player 1",
        name2: "Player 2"
      };
      for (i = _i = 0; _i <= 8; i = ++_i) {
        game["board" + i] = {
          board: (function() {
            var _j, _results;
            _results = [];
            for (x = _j = 0; _j <= 8; x = ++_j) {
              _results.push(false);
            }
            return _results;
          })(),
          winner: false
        };
      }
      return game;
    };
    getPlayerName = function(pid) {
      if(pid == 1)
        return this.name1;
      if(pid == 2)
        return this.name2;
    };
    setPlayerName = function(pid, nname) {
      if(pid == 1)
        this.name1 = nname;
      if(pid == 2)
        this.name2 = nname;
    };
    if ($routeParams.game === 'local') {
      $scope.game = newGame();
      $scope.game.local = true;
    } else {
      $scope.gameURL = $location.absUrl();
      promise = T3Factory.link($scope, 'game', {}, $routeParams.game);
      promise.then(function() {
        var game, ref;
        game = $scope.game;
        ref = new Firebase('https://3t.firebaseio.com/' + $routeParams.game);
        if (game.started === 'pending') {
          console.log('Connecting to the game!');
          localStorage.player = 2;
          ref.onDisconnect().set(null);
          return $scope.game = newGame();
        } else if (game.started === void 0) {
          console.log('Created new game');
          localStorage.player = 1;
          ref.onDisconnect().set(null);
          return $scope.game = {
            started: 'pending'
          };
        } else if (game.started === 'started') {
          console.log('Spectating?');
          localStorage.player = 3;
          return alert("game already started! Just a spectator...");
        }
      });
    }
    $scope.starting = function() {
      return localStorage.starting;
    };
    $scope.is_pending = function() {
      var _ref;
      return ((_ref = $scope.game) != null ? _ref.started : void 0) === 'pending';
    };
    $scope.has_started = function() {
      var _ref;
      return ((_ref = $scope.game) != null ? _ref.started : void 0) === 'started';
    };
    $scope.player1 = function() {
      return localStorage.player === '1' && !$scope.game.winner && !$scope.game.tie;
    };
    $scope.player2 = function() {
      return localStorage.player === '2' && !$scope.game.winner && !$scope.game.tie;
    };
    $scope.your_turn = function() {
      var _ref;
      if ($scope.game.local) {
        return true;
      }
      return ((_ref = $scope.game.turn) != null ? _ref.toString() : void 0) === localStorage.player;
    };
    $scope.turn = function() {
      var _ref;
      return (_ref = $scope.game.turn) != null ? _ref.toString() : void 0;
    };
    $scope.rematch = function() {
      return $scope.game = newGame();
    };
    $scope.homepage = function() {
      $scope.game = null;
      return $location.path("/");
    };
    fullBoard = function(game) {
      return [0, 1, 2, 3, 4, 5, 6, 7, 8].every(function(i) {
        var board;
        board = game["board" + i];
        return board.winner || board.tie;
      });
    };
    checkUltimateWinner = function(game) {
      return checkWinRow(game.board0.winner, game.board1.winner, game.board2.winner) || checkWinRow(game.board3.winner, game.board4.winner, game.board5.winner) || checkWinRow(game.board6.winner, game.board7.winner, game.board8.winner) || checkWinRow(game.board0.winner, game.board3.winner, game.board6.winner) || checkWinRow(game.board1.winner, game.board4.winner, game.board7.winner) || checkWinRow(game.board2.winner, game.board5.winner, game.board8.winner) || checkWinRow(game.board0.winner, game.board4.winner, game.board8.winner) || checkWinRow(game.board2.winner, game.board4.winner, game.board6.winner);
    };
    return checkWinRow = function(a, b, c) {
      if ((a === b && b === c)) {
        if (a !== 0) {
          return a;
        }
      }
    };
  });

}).call(this);
