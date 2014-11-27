'use strict';

angular.module('kjmApp')
    .config(function($stateProvider) {
        $stateProvider
            
            .state('songbook.song', {
                url: '/song/:id',
                templateUrl: 'app/song/song.html',
                controller: 'SongCtrl'
            }).state('artist', {
                url: '/artist/:name',
                templateUrl: 'app/catalog/artists.titles.named.html',
                controller: 'CatalogNamedCtrl'
            }).state('song', {
                url: '/song/:id/:lastState/:useName',
                templateUrl: 'app/song/song.html',
                controller: 'SongCtrl'
            }).state('title', {
                url: '/title/:name',
                templateUrl: 'app/catalog/artists.titles.named.html',
                controller: 'CatalogNamedCtrl',
            }).state('catalog.search.song', {
                url: '/songname/:name',
                templateUrl: 'app/song/song.html',
                controller: 'SongCtrl'

            });
    });
