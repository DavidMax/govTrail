'use strict';

angular.module('govTrailApp')
    .controller('BillsCtrl', function($scope, $http) {

        // declare variables

        $scope.sunlight = {};
        $scope.sunlight.searchPerformed = false;
        $scope.sunlight.currentPage = 1;
        $scope.sunlight.per_page = 10;
        $scope.sunlight.selectChamber = '';
      



        var message = 'Using CongressCtrl controller module';
        console.log(message);

        $scope.sunlight.searchBills = function() {

            $scope.sunlight.searchPerformed = true;

            // URL for Sunlight Foundation API
            var sunUrl = 'https://congress.api.sunlightfoundation.com/bills/search?query=' + $scope.sunlight.billSearchTerm + '&apikey=b7caa92fa4364d9c961bcf7f950f5b40' + '&per_page=' + $scope.sunlight.per_page + '&chamber=' + $scope.sunlight.selectChamber + '&page=' + $scope.sunlight.currentPage;

            $http.get(sunUrl).success(function(data) {

                $scope.sunlight.billResults = data;

                // console.log(data);
                // console.log(data.results);

                $scope.sunlight.billResults.results = data.results;
                $scope.sunlight.billResults.results.official_title = data.results.official_title;

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
                //$scope.currentPage = data.page.page;


                // end ui-boostrap pagination code  

            });


        };

        // end module definition        
    });
