'use strict';

angular.module('kjmApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('history', {
                url: '/history',
                templateUrl: 'app/history/history.html',
                controller: 'HistoryCtrl'
            }).state('catalog.history.song', {
                url: '/song/:id',
                templateUrl: 'app/song/song.html',
                controller: 'SongCtrl'
            }).state('catalog.history', {
                url: '/history',
                templateUrl: 'app/history/history.html',
                controller: 'HistoryCtrl'
            }).state('history.song', {
                url: '/song/:id',
                templateUrl: 'app/song/song.html',
                controller: 'SongCtrl'
            }).state('history.artists.artist', {
                url: '/artist/:name',
                templateUrl: 'app/catalog/artists.titles.named.html',
                controller: 'CatalogNamedCtrl'
            });
    });
