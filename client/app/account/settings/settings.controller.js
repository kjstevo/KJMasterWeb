'use strict';

angular.module('kjmApp')
    .controller('SettingsCtrl', function($scope, User, AuthDb) {
        $scope.errors = {};

        $scope.changePassword = function(form) {
            $scope.submitted = true;
            if (form.$valid) {
                AuthDb.changeNick($scope.user.newPassword)
                    .then(function() {

                        $scope.message = 'Nick successfully changed.';

                    })
                    .catch(function() {
                        // form.password.$setValidity('mongoose', false);
                        // $scope.errors.other = 'Incorrect password';
                        // $scope.message = '';
                    });
            }
        };
    });
