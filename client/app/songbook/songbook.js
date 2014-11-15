'use strict';

angular.module('kjmApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('songbook', {
        url: '/songbook',
        templateUrl: 'app/songbook/songbook.html',
        controller: 'SongbookCtrl'
      });
  });