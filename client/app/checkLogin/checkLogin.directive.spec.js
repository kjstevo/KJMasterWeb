'use strict';

describe('Directive: checkLogin', function () {

  // load the directive's module and view
  beforeEach(module('kjmApp'));
  beforeEach(module('app/checkLogin/checkLogin.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<check-login></check-login>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the checkLogin directive');
  }));
});