'use strict';

angular.module('kjmApp')
    .controller('MainCtrl', function($scope, AuthDb) {

        try {
            AuthDb.getQueue('small').then(function(results) {
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

            AuthDb.retrieveQuickList().then(function(results) {
                $scope.quickList = results.map(function(obj) {
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
                //  $scope.addAlert('There was an error retrieving your quickList.  Check your internet connection.', 'danger');
                $scope.resultError = 'There are no results to display.';
                $scope.results = $scope.resultError;
                console.log(err);
            });
        } catch (error) {
            //$scope.addAlert('There was an error retrieving your songbook.  Check your internet connection.', 'danger');
        }
         var toLowerCase = function(w) {
            return w.toLowerCase();
        };
         $scope.singerMatch = function(singer) {
            try{
                return (toLowerCase(singer) === toLowerCase($scope.sessionUser.get('nick')));
             }catch (error){
              console.log(error); 
             }   
        };

        // $scope.awesomeThings = [];

        // $http.get('/api/things').success(function(awesomeThings) {
        //   $scope.awesomeThings = awesomeThings;
        //   socket.syncUpdates('thing', $scope.awesomeThings);
        // });

        // $scope.addThing = function() {
        //   if ($scope.newThing === '') {
        //     return;
        //   }
        //   $http.post('/api/things', { name: $scope.newThing });
        //   $scope.newThing = '';
        // };

        // $scope.deleteThing = function(thing) {
        //   $http.delete('/api/things/' + thing._id);
        // };

        // $scope.$on('$destroy', function() {
        //   socket.unsyncUpdates('thing');
        // });
    });
