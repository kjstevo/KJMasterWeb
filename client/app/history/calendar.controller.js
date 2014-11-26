'use strict';

angular.module('kjmApp')
    .controller('HistoryCalendarCtrl', function($scope, AuthDb) {
        if ($scope.sessionUser) {
            $scope.today = function(num) {
                if(num){
                    $scope.dt2=new Date();
                } else {
                $scope.dt = new Date();
                }
            };
           

            $scope.clear = function(num) {
                if(num){
                    $scope.dt2=null;
                } else {
                    $scope.dt = null;
                }
            };
$scope.findSongs=function(dt1,dt2){
    AuthDb.getHistoryForDates(dt1,dt2).then(function(results){
        $scope.results=results.map(function(obj){
            return {
                name:obj.get('song').get('bareFile'),
                id:obj.get('song').id
            };
        });
    },function(error){
        console.log(error);
        $scope.addAlert("There was an error.  Please make sure your dates are correct.",'danger');
    })
};

            // Disable weekend selection
            // $scope.disabled = function(date, mode) {
            //     return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
            // };

            // $scope.toggleMin = function() {
            //     $scope.minDate = $scope.minDate ? null : new Date();
            // };
            // $scope.toggleMin();

            $scope.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened = true;
            };
$scope.open2 = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened2 = true;
            };


            $scope.dateOptions = {
                formatYear: 'yyyy',
                startingDay: 1,
                showWeeks: false,

            };

            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];
        }

    });
