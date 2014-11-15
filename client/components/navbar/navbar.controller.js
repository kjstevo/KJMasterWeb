'use strict';

angular.module('kjmApp')
  .controller('NavbarCtrl', function ($scope,  AuthDb, User) {
    $scope.menu = [{
      'title': 'Home',
      'state': 'main'
    }];
var performSearch=function(searchTerm){
  alert(searchTerm);
};
  $scope.searchClear=function(){
      $scope.searchTerm="";
      $scope.searchCollapsed=true;
  };



  $scope.clickSearch=function(searchCollapsed){
          
            var searchTerm=$scope.searchTerm;
           
      if(searchTerm) {
        $scope.searchCollapsed=false;
        performSearch(searchTerm);
        
      }  else  {
          $scope.searchCollapsed=!searchCollapsed;
       };
     

  };
  $scope.currentUser={};
  $scope.isLoggedIn=AuthDb.getCurrentUser();
    
  $scope.isAdmin=function(){
    return AuthDb.isAdmin();
  };
    $scope.searchCollapsed=true;
    $scope.isCollapsed = true;
   
  if($scope.isLoggedIn){
  
   //   $scope.nick=Parse.User.current().get("nick");
    $scope.user=AuthDb.getCurrentUser();
  }
     
  
  
  });
