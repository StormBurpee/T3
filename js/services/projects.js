// Generated by CoffeeScript 1.6.3
(function() {
  app.factory('T3Factory', function(angularFire) {
    return {
      link: function(scope, variable, type, id) {
        var url;
        url = 'https://3t.firebaseio.com/' + id;
        return angularFire(url, scope, variable, type);
      }
    };
  });

}).call(this);