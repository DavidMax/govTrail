'use strict';

angular.module('govTrailApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.federal', {
        url: 'federal',
        templateUrl: 'app/federal/federal.html',
        controller: 'FederalCtrl'
      });
  });