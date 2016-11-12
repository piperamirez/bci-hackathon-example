angular.module('bci.filters', [])
.filter('orderObjectBy', function(){
  return function(input, attribute) {
    if (!angular.isObject(input)) return input;

    var array = [];
    for (i=0; i<input.length; i++) {
      array.push(input[i]);
    }

    array.sort(function(a, b){
      a = parseInt(a[attribute]);
      b = parseInt(b[attribute]);
      return b - a;
    });
    return array;
  }
});
