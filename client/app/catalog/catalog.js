'use strict';

angular.module('kjmApp')
    .config(function($stateProvider) {


        $stateProvider.state('catalog', {
            url: '/catalog',
            abstract: true,
            templateUrl: 'app/catalog/catalog.html'
        }).state('catalog.artists', {
            url: '/artists',
            templateUrl: 'app/catalog/artists.html',
            controller: 'CatalogCtrl'
        }).state('catalog.titles', {
            url: '/titles',
            templateUrl: 'app/catalog/titles.html',
            controller: 'CatalogCtrl'
        }).state('catalog.artists.letter', {
            url: '/artists/:letter',
            templateUrl: 'app/catalog/artists.letter.html',
            controller: 'CatalogLetterCtrl'
        }).state('catalog.artists.artist', {
            url: '/artist/:name',
            templateUrl: 'app/catalog/artists.titles.named.html',
            controller: 'CatalogNamedCtrl'
        }).state('catalog.titles.letter', {
            url: '/titles/:letter',
            templateUrl: 'app/catalog/titles.letter.html',
            controller: 'CatalogLetterCtrl'
        }).state('catalog.titles.title', {
            url: '/title/:name',
            templateUrl: 'app/catalog/artists.titles.named.html',
            controller: 'CatalogNamedCtrl'
        }).state('catalog.search', {
            url: '/search',
            templateUrl: 'app/catalog/search.html',
            controller: 'CatalogCtrl'
        }).state('catalog.search.results', {
            url: '/results/:searchTerm',
            templateUrl: 'app/search/search.html',
            controller: 'SearchCtrl'
        });

    });
