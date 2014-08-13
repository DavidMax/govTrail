'use strict';

describe('Controller: FederalCtrl', function () {

  // load the controller's module
  beforeEach(module('govTrackrApp'));

  var FederalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FederalCtrl = $controller('FederalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
