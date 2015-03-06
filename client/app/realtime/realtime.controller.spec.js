'use strict';

describe('Controller: RealtimeCtrl', function () {

  // load the controller's module
  beforeEach(module('govTrackrApp'));

  var RealtimeCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RealtimeCtrl = $controller('RealtimeCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
