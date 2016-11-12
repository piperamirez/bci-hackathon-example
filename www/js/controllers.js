angular.module('bci.controllers', [])

.controller('LoginCtrl', function($scope, $state, Cliente) {
  $scope.login = {};
  $scope.doLogin = function() {
    $scope.wrongPassword = false;
    var rutPart = splitRut($scope.login.user);
    Cliente.login($scope.login.user).save({
      "rut": rutPart[0],
      "dv": rutPart[1],
      "password": $scope.login.password
    })
    .$promise.then(
      function(response) {
        if (response.mensaje == 'Login Correcto') {
          $state.go('app.tab.inicio', {user: $scope.user})
        }
        else {
          $scope.wrongPassword = true;
        }
      },
      function(error) {
        $scope.wrongPassword = true;
      }
    )
  }

  function splitRut(rut) {
    return [rut.split('-')[0], rut.split('-')[1]];
  }

})

.controller('AppCtrl', function($scope, $state) {
  $scope.logout = function() {
    $state.go('login');
  }
})

.controller('InicioCtrl', function($scope) {

})

.controller('MovimientosCtrl', function($scope) {

});
