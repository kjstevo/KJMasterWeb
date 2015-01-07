'use strict';

angular.module('kjmApp')
  .controller('AdminCtrl', function($scope, $http, AuthDb) {

    // Use the User $resource to fetch all users
     AuthDb.getUsers().then(function(aUsers){
        $scope.users=aUsers;
      }, function(err){
        console.log(err);
      });
    $scope.updateSearch=function(){
      Parse.Cloud.run('addSearchTerms',{
        success:function(results){
          $scope.addAlert(results,'info');
        },
        error:function(err){
          $scope.addAlert(err,'danger');
        }
      });

    };

    $scope.delete = function(user) {
      AuthDb.deleteUser(user);
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
  });
