'use strict';

angular.module('kjmApp')
    .controller('SongCtrl', function($scope, $stateParams, AuthDb, $modal) {
        if ($stateParams.id || $stateParams.name) {
            //$scope.songId=$stateParams.songId;
            var applyResults=function($scope,results){
                $scope.artist = results.get('artist');
                $scope.title = results.get('title');
                $scope.discNum = results.get('discNum');
                $scope.track = results.get('track');
                $scope.key = results.get('key');
                $scope.id = results.id;
                $scope.song = results;
                return results;

                    };
            var applyError=function($scope,err){
                $scope.resultError = err;
                $scope.addAlert('There was an error finding the song.  Please try again later.', 'danger');
                $scope.resultError = 'There are no results to display.';
                $scope.results = $scope.resultError;
                console.log(err);
                return err;
            };

//find song
            try { //start try
                if ($stateParams.id) {
                    
                    $scope.lastState = $stateParams.lastState;
                    
                    AuthDb.loadSongById($stateParams.id).then(function(results) {
                        
                        applyResults($scope,results);

                    }, function(err) {
                       
                        applyError($scope,err);
                    });

                    //end code
                } else {
                    AuthDb.loadSongByName($stateParams.name).then(function(results) {
                        
                        applyResults($scope,results);

                    }, function(err) {
                        
                        applyError($scope,err);

                    });
                }

            } catch (error) {
                    applyError($scope,error);
            } //end try
        } //end if




      
//button states
        $scope.isInQuickList = false;
        $scope.isInRequestList = false;
        $scope.isInSelfRequestList = false;

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

        function checkRequestList() {
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
                if (results) {
                    $scope.isInSelfRequestList = results;
                }

            }, function(err) {
                $scope.isInSelfRequestList = false;
                console.log(err);
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
  ///Button functions
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
        $scope.delRequestList = function(requestFromWeb) {
            AuthDb.delFromRequestList(requestFromWeb).then(function() {
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
                    AuthDb.addToQueue($scope.song);
                   
                    $scope.addAlert('Added to queue.', 'info');
                    checkSelfRequestList();

                } else {
                    
                    $scope.addAlert('cancel', 'info');

                }
            });

        };
        // end buttons

        // check for login
        if ($scope.sessionUser !== null) {
      
            $scope.enableButtons = true;
            
            checkSongbook();
            checkQuickList();
            checkRequestList();
            checkSelfRequestList();

        } else {
            $scope.enableButtons = false;
        }
        //end button states 

        
       //back button link 
        if ($stateParams.useName) {
            $scope.lastState = 
                $stateParams.lastState + 
                '({name:"' + 
                $stateParams.useName + 
                '"})';

        }
//might be uneccessary delete prob
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
