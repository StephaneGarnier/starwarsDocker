(function() {
    "use strict";

    angular.module('app')
        .controller('searchController', ['$scope', '$http', '$q', function($scope, $http, $q) {
            $scope.search = function(searchString){
                $http.get("swapi/search/people/" + searchString).then(function(response) {
                    console.log("==== response success ====");
                    console.log(response.data);
                    $scope.people = response.data.results;
                }, function(response) {
                    console.log("==== response error ====");
                    console.log(response);
                });
                $http.get("swapi/search/films/" + searchString).then(function(response) {
                    console.log("==== response success ====");
                    console.log(response.data);
                    $scope.films = response.data.results;
                }, function(response) {
                    console.log("==== response error ====");
                    console.log(response);
                });
                $http.get("swapi/search/starships/" + searchString).then(function(response) {
                    console.log("==== response success ====");
                    console.log(response.data);
                    $scope.starships = response.data.results;
                }, function(response) {
                    console.log("==== response error ====");
                    console.log(response);
                });
                $http.get("swapi/search/planets/" + searchString).then(function(response) {
                    console.log("==== response success ====");
                    console.log(response.data);
                    $scope.planets = response.data.results;
                }, function(response) {
                    console.log("==== response error ====");
                    console.log(response);
                });
            };
        }]);
})();
