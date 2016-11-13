angular.module('bci.services', ['bci.config'])

.factory('Cliente', function($resource, conf) {
  return {
    login : function(rut) {
      return $resource(conf.api + '/cliente/login', null, {
        save : {
          method: 'POST',
          headers: {'rut': rut}
        }
      })
    },
    perfil : function(rut) {
      return $resource(conf.api + '/cliente/perfil', null, {
        get : {
          method: 'GET',
          headers: {'rut': rut}
        }
      })
    },
    cuentas : function(rut) {
      return $resource(conf.api + '/cliente/cuentas', null, {
        get : {
          method: 'GET',
          headers: {'rut': rut},
          isArray: true
        }
      })
    }
  }
})

.factory('Transferencias', function($resource, conf) {
  return {
    lista : function(rut) {
      return $resource(conf.api + '/transferencias', null, {
        get : {
          method: 'GET',
          headers: {'rut': rut},
          isArray: true
        }
      })
    }
  }
})

.factory('Movimientos', function($resource, conf) {
  return {
    cuenta : function(rut, cuenta) {
      return $resource(conf.api + '/movimientos_cuenta/' + cuenta, null, {
        get : {
          method: 'GET',
          headers: {'rut': rut},
          isArray: true
        }
      })
    }
  }
})

.factory('Tarjetas', function($resource, conf) {
  return {
    lista : function(rut) {
      return $resource(conf.api + '/tarjetas_de_credito', null, {
        get : {
          method: 'GET',
          headers: {'rut': rut},
          isArray: true
        }
      })
    }
  }
})

.factory('Storage', function() {
  return {
    save : function(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    get : function(key) {
      return JSON.parse(localStorage.getItem(key));
    }
  }
});
