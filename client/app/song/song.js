'use strict';

angular.module('kjmApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('catalog.titles.title.song', {
                url: '/song/:id',
                templateUrl: 'app/song/song.html',
                controller: 'SongCtrl'

            }).state('catalog.artists.artist.song', {
                url: '/song/:id',
                templateUrl: 'app/song/song.html',
                controller: 'SongCtrl'

            })
            .state('songbook.song', {
                url: '/song/:id',
                templateUrl: 'app/song/song.html',
                controller: 'SongCtrl'

            }).state('catalog.search.song', {
                url: '/songname/:name',
                templateUrl: 'app/song/song.html',
                controller: 'SongCtrl'

            });
    });
