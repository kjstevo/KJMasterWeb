'use strict';

angular.module('kjmApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('faceLogin', {
                url: '/faceLogin/:id',
                templateUrl: 'app/account/faceLogin/faceLogin.html',
                controller: 'FaceloginCtrl'
            });
    });
