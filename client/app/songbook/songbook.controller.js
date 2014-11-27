'use strict';

angular.module('kjmApp')
    .controller('SongbookCtrl', function($scope, AuthDb,$state) {
        try {
            $scope.currentState=$state.$current.self.name;
            AuthDb.retrieveSongbook().then(function(results) {
                $scope.results = results.map(function(obj) {
                    return {
                        name: obj.get('bareFile'),
                        key: obj.get('key'),
                        bareFile: obj.get('bareFile'),
                        filepath: obj.get('filepath'),
                        discNo: obj.get('discNum'),
                        track: obj.get('track'),
                        artist: obj.get('artist'),
                        title: obj.get('title'),
                        type: 'song',
                        id: obj.id
                    };
                });
            }, function(err) {
                $scope.resultError = err;
                $scope.addAlert('There was an error retrieving your songbook.  Check your internet connection.', 'danger');
                $scope.resultError = 'There are no results to display.';
                $scope.results = $scope.resultError;
                console.log(err);
            });
        } catch (error) {
            $scope.addAlert('There was an error retrieving your songbook.  Check your internet connection.', 'danger');
        }
    });
