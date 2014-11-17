'use strict';

angular.module('kjmApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/account/login/login.html',
                controller: 'LoginCtrl'
            })
            .state('logout', {
                url: '/logout?referrer',
                referrer: 'main',
                template: '',
                controller: function($state, AuthDb) {
                    var referrer = $state.params.referrer ||
                        $state.current.referrer ||
                        'main';
                    AuthDb.logout().then(function() {
                            $state.go(referrer);
                        },

                        function(err) {
                            console.log(err);
                            $state.go(referrer);
                        });

                }
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'app/account/signup/signup.html',
                controller: 'SignupCtrl'
            })
            .state('settings', {
                url: '/settings',
                templateUrl: 'app/account/settings/settings.html',
                controller: 'SettingsCtrl',
                authenticate: true
            });
    })
    .run(function($rootScope) {
        $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
            if (next.name === 'logout' && current && current.name && !current.authenticate) {
                next.referrer = current.name;
            }
        });
    });
