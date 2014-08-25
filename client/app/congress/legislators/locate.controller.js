'use strict';

angular.module('govTrailApp')
    .controller('LocateCtrl', function($scope, $http) {

        // declare variables

        $scope.sunlight = {};
        $scope.sunlight.searchPerformed = false;
        $scope.sunlight.currentPage = 1;



        var message = 'Using LocateCtrl controller module';
        console.log(message);

        $scope.sunlight.locateLegislators = function() {

            $scope.sunlight.searchPerformed = true;

            // URL for Sunlight Foundation API
            var sunUrl = 'https://congress.api.sunlightfoundation.com/legislators/locate?' + 'zip=' + $scope.sunlight.zip + '&apikey=b7caa92fa4364d9c961bcf7f950f5b40';

            $http.get(sunUrl).success(function(data) {

                $scope.sunlight.locateResults = data;

                console.log(data);
        
            });
        };
        // end controller module definition
    });
    