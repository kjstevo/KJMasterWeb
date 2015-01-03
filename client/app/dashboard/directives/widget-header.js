angular
    .module('kjmApp')
    .directive('rdWidgetHeader', rdWidgetTitle);

function rdWidgetTitle() {
    var directive = {
        requires: '^rdWidget',
        scope: {
            title: '@',
            icon: '@',
            href: '@',
            uisref: '@'
        },
        transclude: true,
        template: '<div class="widget-header"><a ui-sref="{{uisref}}" href="{{href}}"><i class="fa" ng-class="icon"></i>{{title}}</a><div class="pull-right" ng-transclude></div></div>',
        restrict: 'E'
    };
    return directive;
};
