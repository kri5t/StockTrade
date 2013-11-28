'use strict';
// Declare app level module which depends on filters, and services
angular.module('stocktrade', ['stocktrade.filters', 'stocktrade.services', 'stocktrade.directives']).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '/partials/index',
                controller: IndexCtrl
            }).
            when('/addUser', {
                templateUrl: '../partials/addUser',
                controller: AddUserCtrl
            }).
            when('/getUserByID/:id', {
                templateUrl: 'index',
                controller: GetUserCtrl
            }).
            when('/getUserList', {
                templateUrl: '../partials/users',
                controller: GetUserListCtrl
            }).
            when('/getRatingByPlaceID/:id', {
                templateUrl: '../partials/ratings',
                controller: GetRatingByPlaceCtrl
            }).
            when('/getRatingByUser/:userID', {
                templateUrl: 'index',
                controller: GetRatingByUserCtrl
            }).
            when('/addRating', {
                templateUrl: '../partials/addRatingForPlace',
                controller: AddRatingForPlaceCtrl
            }).
            when('/addStock', {
                templateUrl: '../partials/addStock',
                controller: AddStockCtrl
            }).
            when('/getStockByID/:id', {
                templateUrl: 'index',
                controller: FindStockCtrl
            }).
            when('/getAllStocks/', {
                templateUrl: '../partials/stocks',
                controller: FindAllStocksCtrl
            }).
            otherwise({
                redirectTo: '/'
            });
        //$locationProvider.html5Mode(true);
    }]);

