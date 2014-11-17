'use strict';

angular.module('kjmApp')
    .controller('SongModalCtrl', function($scope, $modalInstance) {

        $scope.ok = function() {
            $modalInstance.close(true);
        };
        $scope.cancel = function() {
            $modalInstance.close(false);
        };

    });
