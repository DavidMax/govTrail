'use strict';

describe('Controller: CongressCtrl', function () {

  // load the controller's module
  beforeEach(module('govTrackrApp'));

  var CongressCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CongressCtrl = $controller('CongressCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
