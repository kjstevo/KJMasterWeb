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
            controller: 'CatalogCtrl',
            options: {
                justified: true
            },
        }).state('catalog.titles', {
            url: '/titles',
            templateUrl: 'app/catalog/titles.html',
            controller: 'CatalogCtrl',
            options: {
                justified: true
            },
        }).state('catalog.artistsletter', {
            url: '/artists/:letter',
            templateUrl: 'app/catalog/artists.letter.html',
            controller: 'CatalogLetterCtrl',
            options: {
                justified: true
            },
        }).state('catalog.artistsletterartist', {
            url: '/artist/:name',
            templateUrl: 'app/catalog/artists.titles.named.html',
            controller: 'CatalogNamedCtrl',
            options: {
                justified: true
            },
        }).state('catalog.titlesletter', {
            url: '/titles/:letter',
            templateUrl: 'app/catalog/titles.letter.html',
            controller: 'CatalogLetterCtrl',
            options: {
                justified: true
            },
        }).state('catalog.titleslettertitle', {
            url: '/title/:name',
            templateUrl: 'app/catalog/artists.titles.named.html',
            controller: 'CatalogNamedCtrl',
            options: {
                justified: true
            },
        }).state('catalog.search', {
            url: '/search',
            templateUrl: 'app/catalog/search.html',
            controller: 'CatalogCtrl'
        }).state('catalog.search.results', {
            url: '/results/:searchTerm',
            templateUrl: 'app/search/search.html',
            controller: 'SearchCtrl',
        });

    });
