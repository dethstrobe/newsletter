'use strict';

describe('Service: newsletterBuilder', function () {

  // load the service's module
  beforeEach(module('newsletterApp'));

  // instantiate service
  var newsletterBuilder;
  beforeEach(inject(function (_newsletterBuilder_) {
    newsletterBuilder = _newsletterBuilder_;
  }));

  it('should do something', function () {
    expect(!!newsletterBuilder).toBe(true);
  });

});
