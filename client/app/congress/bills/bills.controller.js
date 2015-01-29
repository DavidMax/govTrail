'use strict';

angular.module('govTrailApp')
    .controller('BillsCtrl', function($scope, $http, $firebase) {



        // declare variables

        var SUNLIGHT_API_KEY = 'b7caa92fa4364d9c961bcf7f950f5b40';

        $scope.queryString = '';

        $scope.searchType = 'Congress';

        $scope.predicate = '-searchTime';

        var firebaseRef = new Firebase('https://govtrail.firebaseio.com/');

        $scope.searches = $firebase(firebaseRef).$asArray();

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

            $scope.search = {
                congressQuery: {
                    query: $scope.sunlight.billSearchTerm,
                    chamber: $scope.sunlight.selectChamber,
                    per_page: $scope.sunlight.per_page
                },
                
                searchType: $scope.searchType,
                searchTime: Firebase.ServerValue.TIMESTAMP
                // ,resultCount: $scope.totalItems   
            };

            $scope.searches.$add($scope.search);

            for (var detail in $scope.search.congressQuery) {
                $scope.queryString += "&" + detail + "=" + $scope.search.congressQuery[detail];
                console.log($scope.queryString); 
            }

            var congressUrl = 'https://congress.api.sunlightfoundation.com/bills/search?' 
                + 'apikey='
                + SUNLIGHT_API_KEY 
                + $scope.queryString
                + '&page=' 
                + $scope.sunlight.currentPage;

             console.log(congressUrl);   

            // $scope.searches.$add({searchTerm: $scope.sunlight.billSearchTerm, searchType: 'Congress', searchTime: Firebase.ServerValue.TIMESTAMP, resultPerPage: $scope.sunlight.per_page, chamber: $scope.sunlight.selectChamber});

            // Assemble query string with URL for Sunlight Foundation API
             // var sunUrl = 'https://congress.api.sunlightfoundation.com/bills/search?query=' + $scope.sunlight.billSearchTerm + '&apikey=b7caa92fa4364d9c961bcf7f950f5b40' + '&per_page=' + $scope.sunlight.per_page + '&chamber=' + $scope.sunlight.selectChamber + '&page=' + $scope.sunlight.currentPage;

            $http.get(congressUrl).success(function(data) {

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

                console.log($scope.totalItems);

                // end ui-boostrap pagination code  
            });
            // end searchBills function code    
        };
        // end module definition        
    });