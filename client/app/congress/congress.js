'use strict';

angular.module('govTrailApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('congress', {
        url: '/congress',
        templateUrl: 'app/congress/congress.html',
        controller: 'CongressCtrl'
      });
  });