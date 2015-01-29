'use strict';

angular.module('govTrailApp')
    .controller('MainCtrl', function($scope, $firebase) {


    	// declare variables

        var firebaseRef = new Firebase('https://govtrail.firebaseio.com/');

     //    firebaseRef.orderByChild("searchTime").limitToLast(2).on("child_added", function(snapshot) {
  			// console.log(snapshot.key());
  			// $scope.searches = $firebase(firebaseRef.limitToLast(3)).$asArray();
  			// });

  			// $scope.searches = $firebase(firebaseRef).$asArray();

  			$scope.searches = $firebase(firebaseRef.orderByChild("searchTime").limitToLast(5)).$asArray();

        $scope.predicate = '-searchTime';
    });