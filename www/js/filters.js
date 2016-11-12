angular.module('bci.filters', [])
.filter('orderByDate', function(){
  return function(input) {
    if (!angular.isObject(input)) return input;

    var array = [];
    for (i=0; i<input.length; i++) {
      array.push(input[i]);
    }

    array.sort(function(a, b){
      a = new Date((a['fecha']));
      b = new Date((b['fecha']));
      return b - a;
    });
    return array;
  }
});
