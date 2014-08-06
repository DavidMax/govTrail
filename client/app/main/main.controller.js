'use strict';

angular.module('govTrackrApp')
    .controller('MainCtrl', function($scope, $http) {

        // declare varialbles
        $scope.searchPerformed = false;
        $scope.searchResults = {};
        $scope.agencies = [];
        $scope.currentPage = 1;
        $scope.page = 1;
        $scope.sunlightSearch = {};
        $scope.searchType = 1;

        console.log($scope.searchTerm);

        // get list of agencies
        $http.jsonp('https://www.federalregister.gov/api/v1/agencies?callback=JSON_CALLBACK').success(function(data) {

            $scope.agencies = data;

            console.log(data[0].description);

        });

        console.log($scope.agencies);

        $scope.selectedAgency = 'Choose An Agency';

        $scope.sunlightSearch.searchBills = function() {

            $scope.searchPerformed = true;

            // URL for testing Sunlight Foundation API
            var sunUrl = 'http://congress.api.sunlightfoundation.com/bills/search?query=' + $scope.billSearchTerm + '&apikey=b7caa92fa4364d9c961bcf7f950f5b40';

            $http.get(sunUrl).success(function(data) {

                $scope.sunlightSearch = data;

                console.log(data);
                console.log(data.results);

                $scope.sunlightSearch.billResults = data.results;
                $scope.sunlightSearch.billResults.official_title = data.results.official_title;

                console.log($scope.sunlightSearch.billResults);

            });

        };


        $scope.startSearch = function() {

            console.log('startSearch clicked');
            console.log($scope.searchTerm);
            console.log($scope.selectedAgency);

            $scope.searchPerformed = true;

            $scope.agencyName = $scope.selectedAgency.substring(41, $scope.selectedAgency.length);



            // assemble query string with params
            var url = 'https://www.federalregister.gov/api/v1/articles.json?callback=JSON_CALLBACK&per_page=10&order=relevance&conditions[term]=' + $scope.searchTerm + '&conditions[agencies][]=' + $scope.agencyName + '&page=' + $scope.currentPage;

            $http.jsonp(url).success(function(data) {

                $scope.searchResults = data;

                var description = data.description;
                var results = data.results;

                console.log(description);
                console.log($scope.searchResults);

                $scope.searchResults.results = results;
                $scope.searchResults.description = description;
                $scope.totalItems = data.count;

                $scope.displayTotalFedRegPages = data.total_pages;

                $scope.setPage = function(pageNo) {
                    $scope.currentPage = pageNo;
                    $scope.startSearch();
                };

                $scope.pageChanged = function() {
                    $scope.startSearch();
                    console.log('Page changed to: ' + $scope.currentPage);
                };

                $scope.maxSize = 5;
                $scope.bigTotalItems = data.count;
                $scope.bigCurrentPage = 1;

            });
        };
    });