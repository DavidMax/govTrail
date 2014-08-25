'use strict';

angular.module('govTrailApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('congress', {
        url: '/congress',
        templateUrl: 'app/congress/congress.html',
        controller: 'CongressCtrl'
      })
        .state('congress.bills', {
        url: '/bills',
        templateUrl: 'app/congress/bills/bills.html',
        controller: 'BillsCtrl'
      })
        .state('congress.legislators', {
        url: '/legislators',
        templateUrl: 'app/congress/legislators/locate.html',
        controller: 'LocateCtrl'
      })
        .state('congress.votes', {
        url: '/votes',
        templateUrl: 'app/congress/votes/votes.html',
        controller: 'VotesCtrl'
      });
  });