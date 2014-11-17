'use strict';

angular.module('kjmApp')
    .controller('SongCtrl', function($scope, $stateParams, AuthDb, $modal) {
        if ($stateParams.id) {
            //$scope.songId=$stateParams.songId;
            try { //start try
                AuthDb.loadSongById($stateParams.id).then(function(results) {
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
                    $scope.artist = results.get('artist');
                    $scope.title = results.get('title');
                    $scope.discNum = results.get('discNum');
                    $scope.track = results.get('track');
                    $scope.key = results.get('key');
                    $scope.id = results.id;


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
        $scope.songbook = function(id) {
            AuthDb.addToSongbook(id).then(function() {
                $scope.isInSongbook = true;
                //  $state.go('songbook');
            });

        };

        function checkSongbook() {
            AuthDb.isInSongbook($stateParams.id).then(function(results) {
                if (results.get('key') > 0) {
                    $scope.isInSongbook = true;
                } else {
                    $scope.isInSongbook = false;
                }

            }, function(err) {
                $scope.isInSongbook = false;
            });
        }
        checkSongbook();
        $scope.request = function(id) {
            if (!$scope.sessionUser.get('nick')) {
                $scope.addAlert('You must <a href="/login">login</a> or <a href="/signup">sign up</a> to perform that function', 'warning');
                return;
            }
            var modalInstance = $modal.open({
                template: '<div class="text-center"><h4>Are you sure you want to request this song?</h4></div><br><div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">OK</button><button class="btn btn-danger" ng-click="cancel()">Cancel</button></div>',
                controller: 'SongModalCtrl',
                size: 'small',
                resolve: {
                    id: function() {
                        return $scope.id;
                    },
                    mType: function() {
                        return 'request';
                    }
                }
            });
            modalInstance.result.then(function(confirmed) {
                if (confirmed) {
                    $scope.addAlert('confirmed', 'info');
                } else {
                    $scope.addAlert('cancel', 'info');
                }
            });

        };

        $scope.tabData = [{
                heading: 'Artists',
                route: 'catalog.artists.song',
            }, {
                heading: 'Titles',
                route: 'catalog.titles.song',
            }, {
                heading: 'Search',
                route: 'catalog.search',
            }

        ];

    });
