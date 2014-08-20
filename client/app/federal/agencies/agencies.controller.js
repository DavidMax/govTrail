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

        	// $scope.federal.selectedAgency = 'Choose An Agency';

		 });

       $scope.federal.startSearch = function() {

            console.log('startSearch clicked');
            console.log($scope.federal.searchTerm);
            console.log($scope.federal.selectedAgency);

            $scope.federal.searchPerformed = true;

            $scope.federal.agencyName = $scope.federal.selectedAgency.substring(41, $scope.federal.selectedAgency.length);

        };
        // end module definition        
    });    	