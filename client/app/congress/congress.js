'use strict';

angular.module('govTrackrApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.congress', {
        url: 'congress',
        templateUrl: 'app/congress/congress.html',
        controller: 'CongressCtrl'
      });
  });