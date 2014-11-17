'use strict';

angular.module('kjmApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('catalog.titleslettertitle.song', {
                url: '/song/:id',
                templateUrl: 'app/song/song.html',
                controller: 'SongCtrl'

            }).state('catalog.artistsletterartist.song', {
                url: '/song/:id',
                templateUrl: 'app/song/song.html',
                controller: 'SongCtrl'

            })
            .state('songbook.song', {
                url: '/song/:id',
                templateUrl: 'app/song/song.html',
                controller: 'SongCtrl'

            });
    });
