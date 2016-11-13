angular.module('bci.controllers', [])

.controller('LoginCtrl', function($scope, $state, $ionicModal, Cliente) {
  $scope.login = {};
  $scope.doLogin = function() {
    $scope.logingIn = true;
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
          $state.go('app.tab.inicio', {userId: $scope.login.user})
        }
        else {
          $scope.wrongPassword = true;
        }
      },
      function(error) {
        $scope.wrongPassword = true;
      }
    )
    .finally(function() {
      $scope.logingIn = false;
    });

  }

  $ionicModal.fromTemplateUrl('templates/help.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  function splitRut(rut) {
    return [rut.split('-')[0], rut.split('-')[1]];
  }

})

.controller('AppCtrl', function($scope, $state, $stateParams, Storage) {
  if (Storage.get('bci.user') == null) {
    Storage.save('bci.user', $stateParams.userId);
  }
  $scope.logout = function() {
    $state.go('login');
    Storage.save('bci.user', null);
  }
})

.controller('InicioCtrl', function($scope, Cliente, Storage) {
  $scope.getProfile = function() {
    Cliente.perfil(Storage.get('bci.user')).get()
    .$promise.then(
      function(response) {
        $scope.profile = response;
      },
      function(error) {}
    )
    .finally(function() {
      $scope.$broadcast('scroll.refreshComplete');
    });
  }
  $scope.getProfile();
})

.controller('MovimientosCtrl', function($scope, Transferencias, Storage) {
  $scope.getTransferencias = function() {
    Transferencias.lista(Storage.get('bci.user')).get()
    .$promise.then(
      function(response) {
        $scope.transferencias = response;
      },
      function(error) {}
    )
    .finally(function() {
      $scope.$broadcast('scroll.refreshComplete');
    });
  }
  $scope.getTransferencias();
})

.controller('CuentasCtrl', function($scope, $state, $stateParams, Cliente, Storage) {
  $scope.getCuentas = function() {
    Cliente.cuentas(Storage.get('bci.user')).get()
    .$promise.then(
      function(response) {
        $scope.cuentas = response;
      },
      function(error) {}
    )
    .finally(function() {
      $scope.$broadcast('scroll.refreshComplete');
    });
  }
  $scope.getCuentas();
})

.controller('CuentaDetailCtrl', function($scope, $state, $stateParams, Movimientos, Storage) {
  $scope.getMovimientos = function() {
    Movimientos.cuenta(Storage.get('bci.user'), $stateParams.idCuenta).get()
    .$promise.then(
      function(response) {
        $scope.movimientos = response;
      },
      function(error) {}
    )
    .finally(function() {
      $scope.$broadcast('scroll.refreshComplete');
    });
  }
  $scope.getMovimientos();
});
