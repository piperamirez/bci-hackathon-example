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
