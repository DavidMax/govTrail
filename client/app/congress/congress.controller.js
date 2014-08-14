'use strict';

angular.module('govTrackrApp')
    .controller('CongressCtrl', function($scope, $http) {

        // declare variables

        $scope.sunlight = {};
        $scope.searchPerformed = false;


        var message = 'Using CongressCtrl controller module';
        console.log(message);

        $scope.sunlight.searchBills = function() {

            $scope.sunlight.searchPerformed = true;

            // URL for Sunlight Foundation API
            var sunUrl = 'http://congress.api.sunlightfoundation.com/bills/search?query=' + $scope.sunlight.billSearchTerm + '&apikey=b7caa92fa4364d9c961bcf7f950f5b40';

            $http.get(sunUrl).success(function(data) {

                $scope.sunlight.billResults = data;

                // console.log(data);
                // console.log(data.results);

                $scope.sunlight.billResults.results = data.results;
                $scope.sunlight.billResults.results.official_title = data.results.official_title;

                console.log($scope.sunlight.billResults);

            });

        };
// end controller module definition
    });