'use strict';

angular.module('govTrailApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('federal', {
        url: '/federal',
        templateUrl: 'app/federal/federal.html',
        controller: 'FederalCtrl'
      })
        .state('federal.agencies', {
        url: '/agencies',
        templateUrl: 'app/federal/agencies/agencies.html',
        controller: 'AgenciesCtrl'
      })
        .state('federal.register', {
        url: '/register',
        templateUrl: 'app/federal/register/register.html',
        controller: 'RegisterCtrl'
      });
  });