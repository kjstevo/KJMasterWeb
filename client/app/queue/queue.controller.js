'use strict';

angular.module('kjmApp')
    .controller('QueueCtrl', function($scope, AuthDb,$state) {
            $scope.singers = [];
            $scope.singerIds = [];
            AuthDb.getQueue('large').then(function(results) {
                $scope.queue = results;
                _.each(results, function(obj) {
                    $scope.singers[obj.get('singerOrder')] = "/assets/images/avatar.jpg";
                    $scope.singerIds[obj.get('singerOrder')] = 0;
                    $scope.getUser(obj.get('singer'), obj.get('singerOrder'));

                });

            }, function(err) {
                $scope.resultError = err;
                //  $scope.addAlert('There was an error retrieving your quickList.  Check your internet connection.', 'danger');
                $scope.resultError = 'There are no results to display.';
                $scope.results = $scope.resultError;
                console.log(err);


            });

            $scope.reqClick=function(singer){
                if (singer===$scope.sessionUser.get('nick')){
                    $state.go('requests');
                }
            };

            AuthDb.getQueueCount().then(function(count) {
                $scope.queueCount = count;
            }, function(err) {

                console.log(err);


            });

            $scope.getUser = function(singerName, singerOrder) {
                var sOrder = singerOrder;
                var singerNames = [];
                singerNames.push(singerName);
                AuthDb.getUserFromQueue(singerNames).then(function(obj) {
                        var singer = obj.get('singer');
                        if (angular.isDefined(singer)) {
                                $scope.singers[sOrder] = 'http://graph.facebook.com/' + singer.get('fbId') + '/picture';
                            $scope.singerIds[sOrder] = singer.id;
                                
                          }  

                        },
                        function(error) {
                            console.log(error);

                        });


                };
                $scope.getHistory = function(order) {
                    $state.go('history.id', {
                        'id': singerIds[order]
                    });
                }
                $scope.getUserId = function(singerName) {

                }
                $scope.getSinger = function(singerName) {
                    return $scope.getUser(singerName);
                };

                var toLowerCase = function(w) {
                    return w.toLowerCase();
                };
                $scope.singerMatch = function(singer) {
                    try {
                        return (toLowerCase(singer) === toLowerCase($scope.sessionUser.get('nick')));
                    } catch (error) {
                        console.log(error);
                    }
                };

            });
