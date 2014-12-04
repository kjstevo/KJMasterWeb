'use strict';

describe('Service: requestFromWeb', function () {

  // load the service's module
  beforeEach(module('kjmApp'));

  // instantiate service
  var requestFromWeb;
  beforeEach(inject(function (_requestFromWeb_) {
    requestFromWeb = _requestFromWeb_;
  }));

  it('should do something', function () {
    expect(!!requestFromWeb).toBe(true);
  });

});
