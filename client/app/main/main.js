'use strict';

angular.module('govTrailApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('main.search', {
         url: '/search',
         templateUrl: 'app/main/main-search.html',
         controller: 'MainCtrl'
    });
  });