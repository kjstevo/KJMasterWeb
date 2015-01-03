'use strict';

angular.module('kjmApp')
    .controller('HistoryCtrl', function($scope, AuthDb,$state,$stateParams) {
        $scope.title = 'Song History';
        if ($scope.sessionUser) {
            $scope.currentState=$state.$current.self.name;
            var options={
                'type':'none'
            };
            if(angular.isDefined($stateParams.id)){
                    options={
                        'type':'id',
                        'id':$stateParams.id
                    };
            }
            if(angular.isDefined($stateParams.name)){
               options={
                        'type':'name',
                        name:$stateParams.name
                    };   
            }
            AuthDb.getHistory(options).then(function(results) {
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
