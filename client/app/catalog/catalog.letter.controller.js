'use strict';

angular.module('kjmApp')
    .controller('CatalogLetterCtrl', function($scope, $stateParams, $state, AuthDb) {
        $scope.isLoading = true;
        var type = 'Title';
        var letter = 'A';


        if ($state.$current.self.name === 'catalog.artists.letter') {
            type = 'Artist';

        }

        try {
            letter = $stateParams.letter;

        } catch (error) {
            console.log(error);
        }

        try { //start try
            var lcType = type.toLowerCase();
            $scope.backUrl = lcType + 's.' + letter;
            AuthDb.loadSongsByLetter(letter, type).then(function(results) {
                $scope.results = results.map(function(obj) {
                    return {
                        name: obj.get(lcType),
                        type: lcType
                    };
                });
            }, function(err) {
                $scope.resultError = err;
                $scope.addAlert('There was an error browsing.  Please try again later.', 'danger');
                $scope.resultError = 'There are no results to display.';
                $scope.results = $scope.resultError;
                console.log(err);
            });
        } catch (error) {
            $scope.addAlert('There was an error browsing.  Please try again later.', 'danger');
            $scope.resultError = 'There are no results to display.';
            $scope.results = $scope.resultError;
            console.log(error);

        } //end try
        $scope.isLoading = false;
    });
