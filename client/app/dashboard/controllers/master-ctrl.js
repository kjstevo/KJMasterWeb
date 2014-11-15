'use strict';
/**
 * Master Controller
 */
angular.module('kjmApp')
    .controller('MasterCtrl', function($scope, $location, $rootScope, $cookieStore, $state, AuthDb, User) {


        /**
         * Sidebar Toggle & Cookie Control
         *
         */
        $scope.menu = [{
            'title': 'Home',
            'state': 'main',
            'icon': 'fa fa-home'
        }, {
            'title': 'Catalog',
            'state': 'catalog',
            'icon': 'fa fa-book'
        }, {
            'title': 'Queue',
            'state': 'queue',
            'icon': 'fa fa-group'
        }];
        // var performSearch = function(searchTerm) {
        //     alert(searchTerm);
        // };


        $scope.searchClear = function() {
            $scope.searchTerm = '';
            //$scope.searchCollapsed = true;
        };



        // $scope.clickSearch = function(searchCollapsed, searchTerm) {
        //     if (searchTerm) {
        //         $scope.searchCollapsed = false;
        //         performSearch(searchTerm);

        //     } else {
        //         $scope.searchCollapsed = !searchCollapsed;
        //     }


        // };


        $scope.currentUser = $rootScope.sessionUser;
        $scope.isLoggedIn = $rootScope.sessionUser;

        $scope.isAdmin = function() {
            return AuthDb.isAdmin();
        };
        $scope.searchCollapsed = true;
        $scope.isCollapsed = true;




        var mobileView = 992;

        $scope.getWidth = function() {
            return window.innerWidth;
        };

        $scope.$watch($scope.getWidth, function(newValue, oldValue) {
            if (newValue >= mobileView) {
                if (angular.isDefined($cookieStore.get('toggle'))) {
                    if ($cookieStore.get('toggle') === false) {
                        $rootScope.toggle = false;
                    } else {
                        $rootScope.toggle = true;
                    }
                } else {
                    $rootScope.toggle = true;
                }
            } else {
                $rootScope.toggle = false;
            }

        });
        $scope.addToggleCookie = function(value) {
            if ($scope.getWidth() >= mobileView) {
                $cookieStore.put('toggle', value);
            } else {
                $cookieStore.put('toggle', false);
            }
        };
        $scope.swipe = function(direction) {
            if (direction === 0) {
                if (!$rootScope.toggle) {
                    $state.go('catalog');
                } else {
                    $rootScope.toggle = false;
                }
            } else {

                $rootScope.toggle = true;
            }
            $scope.addToggleCookie($rootScope.toggle);
            // $cookieStore.put('toggle', $rootScope.toggle);
        };

        $rootScope.toggleSidebar = function() {
            $rootScope.toggle = !$rootScope.toggle;
            $scope.addToggleCookie($rootScope.toggle);
            // $cookieStore.put('toggle', $rootScope.toggle);
        };

        window.onresize = function() {
            $scope.$apply();
        };
        $scope.alerts = [];

        $scope.addAlert = function(mesg, typ) {
            $scope.alerts.push({
                msg: mesg,
                type: typ
            });
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

    });
