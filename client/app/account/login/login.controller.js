'use strict';

angular.module('kjmApp')
    .controller('LoginCtrl', function($scope, $rootScope, $state, $window, AuthDb) {
        $scope.user = {};
        $scope.errors = {};

        $scope.login = function(form) {
            $scope.submitted = true;
            if (form.$valid) {
                var user = $scope.user;
                AuthDb.login(user.email, user.password).then(function() {
                    $state.go('main');
                }, function(err) {
                    $scope.addAlert('There was an error with your login', 'danger');
                    console.log(err);
                });
            }
        };






        // Auth.login({
        //   email: $scope.user.email,
        //   password: $scope.user.password
        // })
        // .then(function() {
        //   // Logged in, redirect to home
        //   $state.go('main');
        // })
        // .catch(function(err) {
        //   $scope.errors.other = err.message;
        // });


        $scope.loginOauth = function(provider) {
            $window.location.href = '/auth/' + provider;
        };
    });
