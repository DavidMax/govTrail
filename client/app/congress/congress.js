'use strict';

angular.module('govTrackrApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('congress', {
        url: '/congress',
        templateUrl: 'app/congress/congress.html',
        controller: 'CongressCtrl'
      });
  });