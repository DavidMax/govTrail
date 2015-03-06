'use strict';

angular.module('govTrailApp')
    .controller('VotesCtrl', function($scope, $http) {

        // declare variables

        $scope.sunlight = {};
        $scope.sunlight.searchPerformed = false;
        $scope.sunlight.currentPage = 1;

        var message = 'Using VotesCtrl controller module';
        console.log(message);

        $scope.sunlight.searchVotes = function() {

            $scope.sunlight.searchPerformed = true;

            // URL for Sunlight Foundation API
            var sunUrl = 'https://congress.api.sunlightfoundation.com/votes?' + 'query=' + $scope.sunlight.voteSearchTerm + '&apikey=b7caa92fa4364d9c961bcf7f950f5b40' + '&per_page=10' + '&page=' + $scope.sunlight.currentPage + '&fields=url,official_title,question,bill_id,chamber,congress,voted_at,roll_id,result,,required,breakdown.total';

            $http.get(sunUrl).success(function(data) {

                $scope.sunlight.voteResults = data;

                // console.log(data);
                // console.log(data.results);

                $scope.sunlight.voteResults.results = data.results;
                $scope.sunlight.voteResults.results.official_title = data.results.official_title;

                console.log($scope.sunlight.voteResults);

                // begin ui-bootstrap pagination code

                $scope.setPage = function(pageNo) {
                    $scope.sunlight.currentPage = pageNo;
                    console.log(pageNo);
                    console.log($scope.currentPage);
                };

                $scope.pageChanged = function() {
                    $scope.sunlight.searchVotes();
                    console.log($scope.sunlight.currentPage);
                };

                $scope.maxSize = 5;
                $scope.totalItems = data.count;

                // end ui-boostrap pagination code  

            });


        };

        // end module definition        
    });
