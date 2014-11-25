'use strict';

angular.module('kjmApp')
    .controller('CatalogNamedCtrl', function($scope, $stateParams, $state, AuthDb) {
        $scope.isLoading = true;
        var type = 'Title';
        var name = '';

        if ($state.$current.self.name === 'catalog.artists.artist') {
            type = 'Artist';
        }
        try {
            name = $stateParams.name;

        } catch (error) {
            console.log(error);
        }
        var toLowerCase = function(w) {
            return w.toLowerCase();
        };

        $scope.type = toLowerCase(type) + 's' + '.' + toLowerCase(type);

        // try { //start try
        //   var lcType = type.toLowerCase();
        AuthDb.loadSongsByType(name, type).then(function(results) {

            $scope.results = results;
            // query.equalTo('artist', name);

            // query.find(function(results) {
            //$scope.results = results.map(function(obj) {
            $scope.backUrl = 'catalog/' + toLowerCase(type) + 's' + '/' + toLowerCase(type) + 's' + '/' + name.substr(0, 1);
            //         return {
            //             name: obj.get('bareFile'),
            //             key: obj.get('key'),
            //             bareFile: obj.get('bareFile'),
            //             filepath: obj.get('filepath'),
            //             discNo: obj.get('discNum'),
            //             track: obj.get('track'),
            //             artist: obj.get('artist'),
            //             title: obj.get('title'),
            //             type: 'song',
            //             id: obj.id
            //         };
            //     });

        }, function(err) {
            $scope.resultError = err;
            $scope.addAlert('There was an error browsing.  Please try again later.', 'danger');
            $scope.resultError = 'There are no results to display.';
            $scope.results = $scope.resultError;
            console.log(err);
        });
        // } catch (error) {
        //     $scope.addAlert('There was an error browsing.  Please try again later.', 'danger');
        //     $scope.resultError = 'There are no results to display.';
        //     $scope.results = $scope.resultError;
        //     console.log(error);
        //end code

        // } //end try

        $scope.isLoading = false;
    });
