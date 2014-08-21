'use strict';

angular.module('govTrailApp')
    .controller('AgenciesCtrl', function($scope, $http) {

    	$scope.federal = {};
        $scope.federal.searchPerformed = false;

    	// get list of agencies
        $http.jsonp('https://www.federalregister.gov/api/v1/agencies?callback=JSON_CALLBACK').success(function(data) {

            $scope.federal.agencies = data;

            console.log(data[0].description);

            console.log($scope.federal.agencies);

		 });

        // end module definition        
    });    	