'use strict';

angular.module('kjmApp')
    .controller('HistoryCtrl', function($scope, AuthDb, $q) {
        $scope.title = 'Song History';
        if ($scope.sessionUser) {
            AuthDb.getHistory().then(function(results) {
                $scope.results = results.map(function(obj) {
                    return {
                        id: obj.id,
                        name: obj.get('bareFile'),
                        artist: obj.get('artist'),
                        title: obj.get('title'),
                        bareFile: obj.get('bareFile'),
                        filePath: obj.get('filepath'),
                        key: obj.get('key')
                    };
                });
            }, function(error) {
                console.log(error);
            });

            // var name = res.bareFile;
        }

    });
