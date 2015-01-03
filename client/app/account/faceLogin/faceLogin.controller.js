'use strict';

angular.module('kjmApp')
    .controller('FaceloginCtrl', function($scope, $stateParams, AuthDb, $state) {
        var user = Parse.User.current();
        // try {
        //     if (angular.isDefined($stateParams.nick)) {
        //         user.set('nick', $stateParams.nick);
        //     }
        // } catch (error) {
        //     console.log(error);
        // // }
        // FB.apiAngular('/me', {
        //     success: function(data) {
        //         user.set('fbId', data.id);
        //         user.save().then(function() {
        //             $state.go('main');
        //             return;
        //         }, function(error) {
        //             $scope.addAlert('There was an error.', 'danger');
        //             return;
        //         });

        //     },
        //     error: function(error) {
        //         console.log(error);
        //         $scope.addAlert('There was an error loging into Facebook', 'danger');
        //     }
        // });


        //alert('FB Request Successfully Sent!');

        var id = $stateParams.id;
        FB.apiAngular('/me').then(function(data) {
            //            user.set('fbId', data.id);
            //          $scope.nick = data.get('first_name');
            $scope.fbId = data.id;
            var user = new Parse.User();
            user.id = id;
            user.set('fbId', data.id);
            return user.save().then(function(result) {
                $scope.nick = result.get('nick');
                return AuthDb.loginFacebook(result);

            });

        }, function(error) {
            console.log(error);
            return error;
        });

        try {
            if (angular.isDefined($scope.sessionUser)) {
                $state.go('main');
            };
        } catch (e) {

            console.log(e);
        }

    });
