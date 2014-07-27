'use strict';

angular.module('govTrackrApp')
  .controller('MainCtrl', function ($scope, $http) {

    $scope.searchPerformed = false;

    $scope.searchResults = {};

    $scope.agencies = [];


    $http.jsonp('https://www.federalregister.gov/api/v1/agencies?callback=JSON_CALLBACK').success(function(data) {
    
      $scope.agencies = data;

        console.log(data[0].description);

    });

    console.log($scope.agencies);     

    $scope.selectedAgency = 'Choose An Agency';

    $scope.startSearch = function() {
      
      console.log('startSearch clicked');
      console.log($scope.searchTerm);
     
      $scope.searchPerformed = true;

      $scope.agencyName = $scope.selectedAgency.substring(41, $scope.selectedAgency.length);
 
      var url = 'https://www.federalregister.gov/api/v1/articles.json?callback=JSON_CALLBACK&per_page=10&order=relevance&conditions[term]=' + $scope.searchTerm + '&conditions[agencies][]=' + $scope.agencyName;

      $http.jsonp(url).success(function(data) {
    
      $scope.searchResults = data;

      var description = data.description;
      
      var results = data.results;
     
      console.log(description);
      console.log($scope.searchResults);

      $scope.searchResults.results = results;
      $scope.searchResults.description = description;

    });
  };
});

