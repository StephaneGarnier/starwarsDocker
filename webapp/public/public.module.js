(function(){
    "use strict";

    angular.module('app', [
        'ui.router',
        'ui.bootstrap'
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise(function($injector, $location) {
            var $state = $injector.get("$state");
            $state.go("search");
        });
        $stateProvider
            .state('search', {
                url: '/',
                templateUrl: 'views/search.html',
                controller: 'searchController'
            });
    }]);
})();
