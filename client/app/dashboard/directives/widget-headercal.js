angular
	.module('kjmApp')
	.directive('rdWidgetHeaderCal', rdWidgetTitleCal);

function rdWidgetTitleCal () {
	var directive = {
        requires: '^rdWidget',
        scope: {
            title: '@',
            icon: '@',
            open:'@'
        },
		transclude: true,
        template: '<div class="widget-header"><button type="button" class="btn btn-default" ng-click="open($event)"><i class="glyphicon glyphicon-calendar"></i></button>{{title}}<div class="pull-right" ng-transclude></div></div>',
        restrict: 'E'
    };
    return directive;
};