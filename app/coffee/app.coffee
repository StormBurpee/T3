window.app = angular.module('T3', ['firebase'])

app.config ($routeProvider) ->
  $routeProvider
    .when '/',
      templateUrl: 'views/splash.html'
      controller: 'SplashCtrl'
    .when '/howto',
      templateUrl: 'views/how_to_play.html'
      controller: 'HowToCtrl'
    .when '/random',
      templateUrl: 'views/random.html'
      controller: 'RandomCtrl'
    .when '/:game',
      templateUrl: 'views/main.html'
      controller: 'MainCtrl'
    .otherwise
      redirectTo: "/"
