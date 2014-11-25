'use strict';

angular.module('kjmApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'btford.socket-io',
        'ui.router',
        'ui.bootstrap',
        'parse-angular',
        'parse-angular.enhance',
        'ParseServices',
        'ui.router.tabs',
        'ui.unique'





    ])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $urlRouterProvider
            .otherwise('/');
        $urlRouterProvider.when('/catalog', '/catalog/artists');

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');
    })

.factory('authInterceptor', function($rootScope, $q, $cookieStore, $injector) {
    var state;
    return {
        // Add authorization token to headers
        request: function(config) {
            config.headers = config.headers || {};
            if ($cookieStore.get('token')) {
                config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
            }
            return config;
        },

        // Intercept 401s and redirect you to login
        responseError: function(response) {
            if (response.status === 401) {
                (state || (state = $injector.get('$state'))).go('login');
                // remove any stale tokens
                $cookieStore.remove('token');
                return $q.reject(response);
            } else {
                return $q.reject(response);
            }
        }
    };
})

.run(['ParseSDK', '$cookieStore', '$rootScope', '$state', '$stateParams', 'User', 'AuthDb', 'SongFile', function(ParseService, $cookieStore, $rootScope, $state, $stateParams, User, AuthDb, SongFile) {
    // Redirect to login if route requires auth and you're not logged in

    // Parse is initialised by injecting the ParseService into the Angular app
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.isViewLoading = true;

    // loading animation
    $rootScope.setLoading = function() {
        $rootScope.isViewLoading = true;
    };
    $rootScope.unsetLoading = function() {
        $rootScope.isViewLoading = false;
    };



    // This is now an instance of our SlidebeanUser class <span class="wp-smiley wp-emoji wp-emoji-smile" title=":)">:)</span>
    $rootScope.sessionUser = User.current();
    $rootScope.$on('$stateChangeStart', function(ev, to, toParams, from, fromParams) {
        $rootScope.setLoading();
        if (angular.isDefined($cookieStore.get('toggle'))) {
            $rootScope.toggle = $cookieStore.get('toggle');
        }

        // $rootScope.toggle=false;
        AuthDb.isLoggedIn(function(loggedIn) {
            if (to.authenticate && !loggedIn) {
                $state.go('login');
            }
        });
    });

    $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
        $rootScope.unsetLoading();
    });

    $rootScope.$on('$stateChangeError', function(ev, to, toParams, from, fromParams, err) {
        console.log(err);
    });

    $rootScope.title = ""

}]);
