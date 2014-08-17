'use strict';

angular.module('govTrailApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.congress', {
        url: 'congress',
        templateUrl: 'app/congress/congress.html',
        controller: 'CongressCtrl'
      });
  });