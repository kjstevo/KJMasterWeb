'use strict';

describe('Controller: FaceloginCtrl', function () {

  // load the controller's module
  beforeEach(module('kjmApp'));

  var FaceloginCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FaceloginCtrl = $controller('FaceloginCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
