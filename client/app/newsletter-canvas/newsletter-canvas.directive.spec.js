'use strict';

describe('Directive: newsletterCanvas', function () {

  // load the directive's module and view
  beforeEach(module('newsletterApp'));
  beforeEach(module('app/newsletter-canvas/newsletter-canvas.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<newsletter-canvas></newsletter-canvas>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the newsletterCanvas directive');
  }));
});