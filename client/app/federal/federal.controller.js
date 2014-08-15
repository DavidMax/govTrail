'use strict';

angular.module('govTrackrApp')
    .controller('FederalCtrl', function($scope, $http) {

        // declare varialbles
        $scope.federal = {};
        $scope.federal.searchPerformed = false;
        $scope.federal.searchResults = {};
        $scope.federal.agencies = [];
        $scope.federal.per_page = 10;
        $scope.federal.currentPage = 1;

        $scope.singleModel = 1;

        $scope.checkModel = {
            left: false,
            middle: true,
            right: false
        };

        var message = 'Using FederalCtrl controller module';
        console.log(message);


        // get list of agencies
        $http.jsonp('https://www.federalregister.gov/api/v1/agencies?callback=JSON_CALLBACK').success(function(data) {

            $scope.federal.agencies = data;

            console.log(data[0].description);

        });

        console.log($scope.federal.agencies);

        $scope.federal.selectedAgency = 'Choose An Agency';

        $scope.federal.startSearch = function() {

            console.log('startSearch clicked');
            console.log($scope.federal.searchTerm);
            console.log($scope.federal.selectedAgency);

            $scope.federal.searchPerformed = true;

            $scope.federal.agencyName = $scope.federal.selectedAgency.substring(41, $scope.federal.selectedAgency.length);



            // assemble query string with params
            var url = 'https://www.federalregister.gov/api/v1/articles.json?callback=JSON_CALLBACK&fields[]=title&fields[]=type&fields[]=abstract&fields[]=agency_names&fields[]=body_html_url&fields[]=cfr_references&fields[]=citation&fields[]=html_url&fields[]=pdf_url&fields[]=president&fields[]=publication_date&per_page=' + $scope.federal.per_page + '&order=relevance&conditions[term]=' + $scope.federal.searchTerm + '&conditions[agencies][]=' + $scope.federal.agencyName + '&page=' + $scope.federal.currentPage;

            $http.jsonp(url).success(function(data) {

                $scope.federal.searchResults = data;

                var description = data.description;
                var results = data.results;

                console.log(description);
                console.log($scope.federal.searchResults);

                $scope.federal.searchResults.results = results;
                $scope.federal.searchResults.description = description;
                $scope.totalItems = data.count;

                $scope.federal.displayTotalPages = data.total_pages;

                $scope.setPage = function(pageNo) {
                    $scope.federal.currentPage = pageNo;
                    $scope.federal.startSearch();
                };

                $scope.pageChanged = function() {
                    $scope.federal.startSearch();
                    console.log($scope.federal.currentPage);
                };

                $scope.maxSize = 5;


            });
        };


        // end module definition        
    });