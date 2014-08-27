'use strict';

angular.module('govTrailApp')
    .controller('BillsCtrl', function($scope, $http) {

        // declare variables

        //create empty sunlight object
        $scope.sunlight = {};
        // init toggle searchPerformed to true
        $scope.sunlight.searchPerformed = false;
        // init currentPage to 1 for ui-bootstrap pagination
        $scope.sunlight.currentPage = 1;
        // init per_page for both API and pagination
        $scope.sunlight.per_page = 10;
        //init chamber to empty string in case of 'Both' selected
        $scope.sunlight.selectChamber = '';

        console.log('Using CongressCtrl controller module');

        // begin searchBills function code
        $scope.sunlight.searchBills = function() {

            // toggle searchPerformed to true
            $scope.sunlight.searchPerformed = true;

            // Assemble query string with URL for Sunlight Foundation API
            var sunUrl = 'https://congress.api.sunlightfoundation.com/bills/search?query=' + $scope.sunlight.billSearchTerm + '&apikey=b7caa92fa4364d9c961bcf7f950f5b40' + '&per_page=' + $scope.sunlight.per_page + '&chamber=' + $scope.sunlight.selectChamber + '&page=' + $scope.sunlight.currentPage;

            $http.get(sunUrl).success(function(data) {

                $scope.sunlight.billResults = data;

                $scope.sunlight.billResults.results = data.results;

                console.log($scope.sunlight.billResults);

                // begin ui-bootstrap pagination code

                $scope.setPage = function(pageNo) {
                    $scope.sunlight.currentPage = pageNo;
                    console.log(pageNo);
                    console.log($scope.currentPage);
                };

                $scope.pageChanged = function() {
                    $scope.sunlight.searchBills();
                    console.log($scope.sunlight.currentPage);
                };

                $scope.maxSize = 5;
                $scope.totalItems = data.count;

                // end ui-boostrap pagination code  
            });
            // end searchBills function code    
        };
        // end module definition        
    });