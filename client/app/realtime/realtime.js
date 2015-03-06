'use strict';

angular.module('govTrailApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('realtime', {
        url: '/realtime',
        templateUrl: 'app/realtime/realtime.html',
        controller: 'RealtimeCtrl'
      });
  });