'use strict';

angular.module('kjmApp')
  .controller('RequestsCtrl', function ($scope,AuthDb) {
   AuthDb.getRequests().then(function(results) {
            $scope.requests = results;
        }, function(err) {
            $scope.searchError = err;
            //  $scope.addAlert('There was an error retrieving your quickList.  Check your internet connection.', 'danger');
            $scope.searchError = 'There are no results to display.';
            $scope.requests = $scope.searchError;
            console.log(err);


        });
});
 