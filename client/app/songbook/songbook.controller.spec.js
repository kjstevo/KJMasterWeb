'use strict';

describe('Controller: SongbookCtrl', function () {

  // load the controller's module
  beforeEach(module('kjmApp'));

  var SongbookCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SongbookCtrl = $controller('SongbookCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
