angular
    .module('kjmApp')
    .directive('mainMenu', mainMenu);

function mainMenu() {
    var directive = {
        templateUrl: 'app/menu/menu.html',
        restrict: 'EA'
    };
    return directive;

};
