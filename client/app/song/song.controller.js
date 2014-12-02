'use strict';

angular.module('kjmApp')
    .controller('SongCtrl', function($scope, $stateParams, AuthDb, $modal) {
        if ($stateParams.id || $stateParams.name) {
            //$scope.songId=$stateParams.songId;
            try { //start try
                if ($stateParams.id) {

                    $scope.lastState=$stateParams.lastState;
                    AuthDb.loadSongById($stateParams.id).then(function(results) {

                        $scope.artist = results.get('artist');
                        $scope.title = results.get('title');
                        $scope.discNum = results.get('discNum');
                        $scope.track = results.get('track');
                        $scope.key = results.get('key');
                        $scope.id = results.id;
                        $scope.song=results;


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
                        $scope.song=results;


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
         $scope.delRequestList = function(id) {
            AuthDb.delFromRequestList(id).then(function() {
                $scope.isInRequestList = false;
                $scope.addAlert('The request has been deleted from the queue.', 'info');

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
        $scope.isInRequestList=false;
        $scope.isInSelfRequestList=false;
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
        function checkRequestList(){
                AuthDb.isInRequestList($stateParams.id).then(function(results) {
                if (results > 0) {
                    $scope.isInRequestList = true;
                    
                } else {
                    $scope.isInRequestList = false;
                }
            }, function(err) {
                $scope.isInRequestList = false;
            });
        }

        function checkSelfRequestList() {
            AuthDb.isInSelfRequestList($stateParams.id).then(function(results) {
                if (results > 0) {
                    $scope.isInSelfRequestList = true;
                    
                } else {
                    $scope.isInSelfRequestList = false;
                }
            }, function(err) {
                $scope.isInSelfRequestList = false;
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
            checkRequestList();
            checkSelfRequestList();
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
                    //AuthDb.addToQueue($scope.id);
                    AuthDb.addToQueue2($scope.song);
                    $scope.addAlert('Added to queue.', 'info');
                } else {
                    $scope.addAlert('cancel', 'info');
                }
            });

        };
if($stateParams.useName){
      $scope.lastState=$stateParams.lastState+'({name:"'+ $stateParams.useName+'"})';
        
    }
    
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
