'use strict';

angular.module('kjmApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('queue', {
        url: '/queue',
        templateUrl: 'app/queue/queue.html',
        controller: 'QueueCtrl'
      });
  });