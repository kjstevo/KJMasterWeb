'use strict';

angular.module('kjmApp')
  .directive('checkLogin', function () {
    return {
      templateUrl: 'app/checkLogin/checkLogin.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });