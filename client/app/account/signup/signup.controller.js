'use strict';

angular.module('kjmApp')
    .controller('SignupCtrl', function($scope, AuthDb, $state, $window) {
        $scope.user = {};
        $scope.errors = {};

        $scope.register = function(form) {
            $scope.submitted = true;

            if (form.$valid) {

                AuthDb.createUser($scope.user.email, $scope.user.password, {
                    email: $scope.user.email,
                    nick: $scope.user.nick,
                    role: 'user'
                }).then(function() {
                        // Account created, redirect to home
                        AuthDb.login($scope.user.email, $scope.user.password).then(function() {
                            $state.go('main');
                        }, function(err) {
                            $scope.addAlert('There was an error signing up', 'danger');
                            console.log(err);
                        });


                    },
                    function(err) {
                        $scope.addAlert('There was an error signing up', 'danger');
                        console.log(err);
                        // Update validity of form fields that match the mongoose errors
                        // angular.forEach(err.errors, function(error, field) {
                    });

                //end signup

            } //endif
        }; //end func
        $scope.loginFacebook=function(){
                    AuthDb.loginFacebook().then(function() {
                          FB.apiAngular(
                                '/me')
                            .then(function(data) {

                                //alert('FB Request Successfully Sent!');

                                var user = Parse.User.current();
                                var first=data.first_name;
                                user.set('nick',first);
                                user.save();
                               
                            
                            }, function(error) {

                                //alert('FB Request Unsuccessful!');

                               consol.log(error);
                            
                            });

  
                            // $state.go('main');
                        }, function(err) {
                            $scope.addAlert('There was an error signing up', 'danger');
                            console.log(err);
                        });


        };
        $scope.loginOauth = function(provider) {
            $window.location.href = '/auth/' + provider;
        };

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
    });
