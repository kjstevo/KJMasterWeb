'use strict';

angular.module('kjmApp')
    .controller('CatalogCtrl', function($scope, $stateParams) {



        $scope.letters = ['A', 'B', 'C', 'D', 'E',
            'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ];
        $scope.artistType = 'Artist';
        $scope.titleType = 'Title';

        $scope.tabData = [{
                heading: 'Artists',
                route: 'catalog.artists',
            }, {
                heading: 'Titles',
                route: 'catalog.titles',
            }, {
                heading: 'Search',
                route: 'catalog.search',
            }

        ];


        // $scope.clickName=function(typeName,type){
        //   var lcType = type.toLowerCase();
        //     var query = new Parse.Query('Song');
        //     query.equalTo(lcType, typeName.name);
        //     query.find({
        //         success: function(results) {
        //             $scope.$apply(function() {
        //                 $scope.results = results.map(function(obj) {
        //                     return {
        //                         name:     obj.get('bareFile'),
        //                         key:      obj.get('key'),
        //                         bareFile: obj.get('bareFile'),
        //                         filepath: obj.get('filepath'),
        //                         discNo:   obj.get('discNum'),   
        //                         track:    obj.get('track'),
        //                         artist:   obj.get('artist'),
        //                         title:    obj.get('title'),
        //                         type:     'song'
        //                     };
        //                 });

        //             });

        //         },
        //         error: function(error) {
        //             console.log(error);
        //         }

        //     });
        // };
        // if(angular.isDefined($stateParams.letter)){
        //             var lcType =$stateParams.type.toLowerCase();
        //             var query = new Parse.Query($stateParams.type);
        //             query.startsWith(lcType, $stateParams.letter);
        //             query.select(lcType);
        //             query.find({
        //                 success: function(results) {
        //                     $scope.$apply(function() {
        //                         $scope.results = results.map(function(obj) {
        //                             return {
        //                                 name: obj.get(lcType),
        //                                 type: lcType
        //                             };
        //                         });

        //                     });

        //                 },
        //                 error: function(error) {
        //                     console.log(error);
        //                 }

        //             });

        //         }

    });
