'use strict';

angular.module('kjmApp')
    .controller('SearchCtrl', function($scope, $state, AuthDb, $stateParams) {
        $scope.searchCollapsed = false;
        $scope.isDoneSearching = true;
        $scope.isLoadingResults = false;

        function performSearch(searchCollapsed, searchTerm) {
            $scope.isDoneSearching = false;
            $scope.searchCollapsed = false;

            if (searchTerm !== null) {
                AuthDb.searchSongs(searchTerm).then(function(results) {
                    $scope.searchResults = results;
                }, function(err) {
                    $scope.searchError = err;
                    $scope.addAlert('There was an error searching.  Please try again later.', 'danger');
                    $scope.searchError = 'There are no results to display.';
                    $scope.searchResults = $scope.searchError;
                    console.log(err);
                });

            }
            $scope.isDoneSearching = true;
            return;
        }
        if (angular.isDefined($stateParams.searchTerm)) {
            performSearch(false, $stateParams.searchTerm);
        }

        // var toLowerCase = function(w) {
        //     return w.toLowerCase();
        // };


        // var Catalog = Parse.Object.extend({
        //     className: 'Song',
        //     // Extend the object with getter and setters  (see parse-angular-patch GitHub repo)
        //     attrs: ['artist',
        //         'title',
        //         'name'
        //     ]
        // });


        // $scope.hideLoading=true;
        $scope.clickSearch = function(searchCollapsed, searchTerm) {
            $scope.isLoadingResults = true;
            $state.go('catalog.search.results', {
                'searchTerm': searchTerm
            });
        };
        $scope.songClick = function(song) {
            $state.go('catalog.search.song', {
                'name': song.name
            });
        };
        // function performSearch(searchCollapsed,searchTerm){

        //       clickSearch(searchCollapsed,searchTerm); 
        //   }
        // //       var searchTerms = searchTerm;
        //     var words = searchTerms.split(/\b/);
        //     words = _.map(words, toLowerCase);
        //     var stopWords = ['the', 'in', 'and', 'of', 'an', 'a', 'i'];
        //     words = _.filter(words, function(w) {
        //         return w.match(/^\w+$/) && !_.contains(stopWords, w);
        //     });


        //         var query = new Parse.Query(Catalog);

        //         query.containsAll('searchTerms', words);
        //         query.select('artist', 'title', 'name');
        //         query.find({
        //             success: function(results) {

        //                 $scope.$apply(function() {
        //                     $scope.searchResults = results;
        //                 });

        //             },
        //             error: function(error) {
        //                 console.log(error);
        //             }

        //         });
        //             $scope.isDoneSearching = true;
        //     }

    });
