/**
 * Alerts Controller
 */
angular.module('kjmApp').controller('AlertsCtrl', ['$scope', AlertsCtrl]);

function AlertsCtrl($scope) {
    $scope.alerts = [
        // { type: 'success', msg: 'Thanks for visiting! Feel free to create pull requests to improve the dashboard!' },
        //{ type: 'danger', msg: 'Found a bug? Create an issue with as many details as you can.' }
    ];

    $scope.addAlert = function(mesg) {
        $scope.alerts.push({
            msg: mesg
        });
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
}
