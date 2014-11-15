'use strict';

angular.module('kjmApp')
  .controller('SignupCtrl', function($scope, AuthDb, $state, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if (form.$valid) {
  //       Auth.createUser($scope.user.nick,$scope.user.email,$scope.user.password
  //       ,{
  //         success: function() {
  //         // Account created, redirect to home
  //         $state.go('main');
  //          },
  // error:  function(err) {
  //         err = err.data;
  //         $scope.errors = {};
  //     // Update validity of form fields that match the mongoose errors
  //         angular.forEach(err.errors, function(error, field) {
  //           form[field].$setValidity('mongoose', false);
  //           $scope.errors[field] = error.message;
  //         });
  //       }});
    AuthDb.createUser($scope.user.email, $scope.user.password,
      {
      email:   $scope.user.email,
      nick: $scope.user.nick,
      role: 'user'
    },{
        success: function() {
            // Account created, redirect to home
          // AuthDb.login($scope.user.email,$scope.user.password);
            $state.go('main');
             },
        error:  function(err) {
          alert(err);
            err = err.data;
            $scope.errors = {};
        // Update validity of form fields that match the mongoose errors
           // angular.forEach(err.errors, function(error, field) {
         console.log(err.data);
         }});
        
          //end signup

      }//endif
    };  //end func

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
