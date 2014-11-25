'use strict';

angular.module('kjmApp')
    .controller('SongCtrl', function($scope, $stateParams, AuthDb, $modal) {
        if ($stateParams.id || $stateParams.name) {
            //$scope.songId=$stateParams.songId;
            try { //start try
                if ($stateParams.id) {
                    AuthDb.loadSongById($stateParams.id).then(function(results) {

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

                    //end code
                } else {
                    AuthDb.loadSongByName($stateParams.name).then(function(results) {

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
                }
            } catch (error) {
                $scope.addAlert('There was an error finding the song.  Please try again later.', 'danger');
                $scope.resultError = 'There are no results to display.';
                $scope.results = $scope.resultError;
                console.log(error);

            } //end try
        }
        $scope.addSongbook = function(id) {
            AuthDb.addToSongbook(id).then(function() {
                $scope.isInSongbook = true;
                $scope.addAlert('The song has been added to your songbook.', 'info');

            });


        };
        $scope.delSongbook = function(id) {
            AuthDb.delFromSongbook(id).then(function() {
                $scope.isInSongbook = false;
                $scope.addAlert('The song has been deleted from your songbook.', 'info');

            });


        };

        $scope.addQuickList = function(id) {
            AuthDb.addToQuickList(id).then(function() {
                $scope.isInQuickList = true;
                $scope.addAlert('The song has been added to your quick list.', 'info');

            });


        };
        $scope.delQuickList = function(id) {
            AuthDb.delFromQuickList(id).then(function() {
                $scope.isInQuickList = false;
                $scope.addAlert('The song has been deleted from your quick list.', 'info');

            });


        };

        $scope.isInQuickList = false;

        function checkQuickList() {
            AuthDb.isInQuickList($stateParams.id).then(function(results) {
                if (results.get('key') > 0) {
                    $scope.isInQuickList = true;

                } else {
                    $scope.isInQuickList = false;
                }
            }, function(err) {
                $scope.isInQuickList = false;
            });
        }

        function checkSongbook() {
            AuthDb.isInSongbook($stateParams.id).then(function(results) {
                if (results.get('key') > 0) {
                    $scope.isInSongbook = true;
                } else {
                    $scope.isInSongbook = false;
                }

            }, function(err) {
                $scope.isInSongbook = false;
                console.log(err);
            });
        }
        if ($scope.sessionUser !== null) {
            $scope.enableButtons = true;
            checkSongbook();
            checkQuickList();
        } else {
            $scope.enableButtons = false;
        }
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
                    AuthDb.addToQueue($scope.id);
                    $scope.addAlert('Added to queue.', 'info');
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
