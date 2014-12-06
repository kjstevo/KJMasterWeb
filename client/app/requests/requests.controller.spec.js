'use strict';

describe('Controller: RequestsCtrl', function () {

  // load the controller's module
  beforeEach(module('kjmApp'));

  var RequestsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RequestsCtrl = $controller('RequestsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
