'use strict';

describe('Service: AuthDb', function () {

  // load the service's module
  beforeEach(module('kjmApp'));

  // instantiate service
  var AuthDb;
  beforeEach(inject(function (_AuthDb_) {
    AuthDb = _AuthDb_;
  }));

  it('should do something', function () {
    expect(!!AuthDb).toBe(true);
  });

});
