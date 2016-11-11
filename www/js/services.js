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

  }
});
