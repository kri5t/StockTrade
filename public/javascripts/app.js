'use strict';

var stockTradeApp = angular.module('stocktrade', ['ui.bootstrap', 'stocktrade.filters', 'stocktrade.services', 'stocktrade.directives', 'ngRoute']);


// Declare app level module which depends on filters, and services
stockTradeApp.config(function($routeProvider,$httpProvider, $locationProvider) {
 //   $httpProvider.interceptors.push('httpLoginInterceptor');

    $routeProvider.
        when('/', {
            templateUrl: '/partials/index',
            controller: 'IndexCtrl',
            access: {
                isFree: true
            }
        }).
        when('/addUser', {
            templateUrl: '../partials/addUser',
            controller: 'AddUserCtrl',
            access: {
                isFree: false
            }
        }).
        when('/getUserByID/:id', {
            templateUrl: '../partials/user',
            controller: 'GetUserCtrl',
            access: {
                isFree: true
            }
        }).
        when('/login', {
            templateUrl: '../partials/mustLogin',
            access: {
                isFree: true
            }
        }).
        when('/getUserList', {
            templateUrl: '../partials/users',
            controller: 'GetUserListCtrl',
            access: {
                isFree: true
            }
        }).
        when('/getRatingByStockID/:id', {
            templateUrl: '../partials/ratings',
            controller: 'GetRatingByStockCtrl',
            access: {
                isFree: true
            }
        }).
        when('/getRatingByUser/:userID', {
            templateUrl: 'index',
            controller: 'GetRatingByUserCtrl',
            access: {
                isFree: true
            }
        }).
        when('/addRating/:stockID', {
            templateUrl: '../partials/addRatingForStock',
            controller: 'AddRatingForStockCtrl',
            access: {
                isFree: false
            }
        }).
        when('/addStock', {
            templateUrl: '../partials/addStock',
            controller: 'AddStockCtrl',
            access: {
                isFree: false
            }
        }).
        when('/getStockByID/:id', {
            templateUrl: 'index',
            controller: 'FindStockCtrl',
            access: {
                isFree: true
            }
        }).
        when('/getStockByID/', {
            templateUrl: '../partials/stockSearchResults',
            // controller: FindPlaceCtrl,
            access: {
                isFree: true
            }
        }).
        when('/getAllStocks/', {
            templateUrl: '../partials/stocks',
            controller: 'FindAllStocksCtrl',
            access: {
                isFree: true
            }
        }).
        otherwise({
            redirectTo: '/'
        });
});

stockTradeApp.run(['$rootScope','$location','Auth', function run(root,location,Auth) {
    root.$on('$routeChangeSuccess', function(event, currentRoute, previousRoute) {
        var callback = function(result) {
            if (currentRoute.access !== undefined && !currentRoute.access.isFree && !result) {
                location.path("/login");
//                next();
                // reload the login route
            }
        }
        Auth.checkLogin(callback);

    });
}]);



