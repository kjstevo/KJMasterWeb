'use strict';

angular.module('kjmApp')
    .controller('LoginCtrl', function($scope, $rootScope, $state, $window, AuthDb) {
            $scope.user = {};
            $scope.errors = {};

            $scope.login = function(form) {
                $scope.submitted = true;
                if (form.$valid) {
                  var user=$scope.user;
                    AuthDb.login(user.email,user.password, {
                        success: function(pUser) {
                           
                            
                            $state.go('main');
                        },
                        error: function(pUser, error) {
                        console.log(error);    // The login failed. Check error to see why.
                        }
                    });
                }
},





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
