'use strict';

angular.module('kjmApp')
    .controller('SongCtrl', function($scope, $stateParams, AuthDb) {
        if ($stateParams.id) {
            //$scope.songId=$stateParams.songId;
            try { //start try
                AuthDb.getSongById($stateParams.id).then(function(results) {
                    // $scope.results = results.map(function(obj) {
                    //     return {
                    //         name: obj.get('bareFile'),
                    //         key: obj.get('key'),
                    //         bareFile: obj.get('bareFile'),
                    //         filepath: obj.get('filepath'),
                    //         discNo: obj.get('discNum'),
                    //         track: obj.get('track'),
                    //         artist: obj.get('artist'),
                    //         title: obj.get('title'),
                    //         type: 'song',
                    //         id: obj.id
                    //     };
                    // });
                    $scope.results = results;
                }, function(err) {
                    $scope.resultError = err;
                    $scope.addAlert('There was an error finding the song.  Please try again later.', 'danger');
                    $scope.resultError = 'There are no results to display.';
                    $scope.results = $scope.resultError;
                    console.log(err);
                });
            } catch (error) {
                $scope.addAlert('There was an error finding the song.  Please try again later.', 'danger');
                $scope.resultError = 'There are no results to display.';
                $scope.results = $scope.resultError;
                console.log(error);
                //end code

            } //end try
        }
    });
