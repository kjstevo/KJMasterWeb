'use strict';

angular.module('kjmApp')
    .controller('QueueCtrl', function($scope, AuthDb) {
        AuthDb.getQueue('large').then(function(results) {
            $scope.queue = results;
        }, function(err) {
            $scope.resultError = err;
            //  $scope.addAlert('There was an error retrieving your quickList.  Check your internet connection.', 'danger');
            $scope.resultError = 'There are no results to display.';
            $scope.results = $scope.resultError;
            console.log(err);


        });
        AuthDb.getQueueCount().then(function(count) {
            $scope.queueCount = count;
        }, function(err) {

            console.log(err);


        });
        var toLowerCase = function(w) {
            return w.toLowerCase();
        };
        $scope.singerMatch = function(singer) {
            return (toLowerCase(singer) === toLowerCase($scope.sessionUser.get('nick')));
        };

    });
