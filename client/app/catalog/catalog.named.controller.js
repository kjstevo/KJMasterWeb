'use strict';

angular.module('kjmApp')
    .controller('CatalogNamedCtrl', function($scope, $stateParams, $state, AuthDb) {
        $scope.isLoading = true;
        var type = 'Title';
        var name = '';
        var stateName = $state.$current.self.name;
        if ((stateName === 'catalog.artists.artist') || (stateName === 'artist')) {
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
        var lcType = type.toLowerCase();
        $scope.currentState = lcType
        if (stateName.substr(0, 7) === 'catalog') {
            $scope.prepend = 'catalog.' + lcType + 's.';
        } else {
            $scope.prepend = '';
        }
        
        $scope.type = lcType + 's' + '.' + lcType;
        $scope.name = name;
        // try { //start try
        
        AuthDb.loadSongsByType(name, type).then(function(results) {

            $scope.results = results;

            if (stateName.substr(0, 7) === 'catalog') {
                $scope.backUrl = 'catalog/' + lcType + 's' + '/' + lcType + 's' + '/' + name.substr(0, 1);
            } else {
                $scope.backUrl = lcType + 's' + '/' + name.substr(0, 1);
            }
        }, function(err) {
            $scope.resultError = err;
            $scope.addAlert('There was an error browsing.  Please try again later.', 'danger');
            $scope.resultError = 'There are no results to display.';
            $scope.results = $scope.resultError;
            console.log(err);
        });


        $scope.isLoading = false;
    });
