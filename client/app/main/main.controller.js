'use strict';

angular.module('govTrackrApp')
    .controller('MainCtrl', function($scope, $http) {

        // declare varialbles
        $scope.searchPerformed = false;
        $scope.searchResults = {};
        $scope.agencies = [];
        $scope.currentPage = 1;
        $scope.page = 1;
        $scope.sunlight = {};
        $scope.federal = {};
        $scope.searchType = 1;


        console.log($scope.federal.searchTerm);

        // get list of agencies
        $http.jsonp('https://www.federalregister.gov/api/v1/agencies?callback=JSON_CALLBACK').success(function(data) {

            $scope.federal.agencies = data;

            console.log(data[0].description);

        });

        console.log($scope.federal.agencies);

        $scope.federal.selectedAgency = 'Choose An Agency';

        $scope.sunlight.searchBills = function() {

            $scope.sunlight.searchPerformed = true;

            // URL for testing Sunlight Foundation API
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


        $scope.federal.startSearch = function() {

            console.log('startSearch clicked');
            console.log($scope.federal.searchTerm);
            console.log($scope.federal.selectedAgency);

            $scope.federal.searchPerformed = true;

            $scope.federal.agencyName = $scope.federal.selectedAgency.substring(41, $scope.federal.selectedAgency.length);



            // assemble query string with params
            var url = 'https://www.federalregister.gov/api/v1/articles.json?callback=JSON_CALLBACK&per_page=10&order=relevance&conditions[term]=' + $scope.federal.searchTerm + '&conditions[agencies][]=' + $scope.federal.agencyName + '&page=' + $scope.federal.currentPage;

            $http.jsonp(url).success(function(data) {

                $scope.federal.searchResults = data;

                var description = data.description;
                var results = data.results;

                console.log(description);
                console.log($scope.federal.searchResults);

                $scope.federal.searchResults.results = results;
                $scope.federal.searchResults.description = description;
                $scope.totalItems = data.count;

                $scope.displayTotalfederalPages = data.total_pages;

                $scope.setPage = function(pageNo) {
                    $scope.federal.currentPage = pageNo;
                    $scope.currentPage = $scope.federal.currentPage;
                    $scope.federal.startSearch();
                };

                $scope.pageChanged = function() {
                    $scope.federal.startSearch();
                    console.log('Page changed to: ' + $scope.currentPage);
                };

                $scope.maxSize = 5;
                $scope.bigTotalItems = data.count;
                $scope.bigCurrentPage = 1;

            });
        };
    });