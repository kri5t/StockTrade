'use strict';

var stockTradeApp = angular.module('stocktrade', ['ui.bootstrap', 'stocktrade.filters', 'stocktrade.services', 'stocktrade.directives', 'ngRoute']);

//stockTradeApp.factory('httpLoginInterceptor', function ($q,$location) {
//    return function(promise) {
//        return promise.then(
//            function(response){
//                return response;
//            },
//            function(response) {
//                if (response.status === 401)
//                    $location.url('/login');
//                return $q.reject(response);
//            }
//        );
//    }
//});

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
            templateUrl: '../partials/addRatingForPlace',
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

stockTradeApp.run(['$rootScope', '$window', 'srvAuth', function run($rootScope, $window, srvAuth) {

    $rootScope.user = {};

    $window.fbAsyncInit = function() {
        // Executed when the SDK is loaded

        FB.init({

            /*
             The app id of the web app;
             To register a new app visit Facebook App Dashboard
             ( https://developers.facebook.com/apps/ )
             */
            appId: '1439095322970958',

            /*
             Adding a Channel File improves the performance
             of the javascript SDK, by addressing issues
             with cross-domain communication in certain browsers.
             */
            channelUrl: 'app/channel.html',

            /*
             Set if you want to check the authentication status
             at the start up of the app
             */
            status: true,

            /*
             Enable cookies to allow the server to access
             the session
             */
            cookie: true,

            /* Parse XFBML */
            xfbml: true
        });

        srvAuth.watchLoginChange();

    };

    // Are you familiar to IIFE ( http://bit.ly/iifewdb ) ?

    (function(d){
        // load the Facebook javascript SDK

        var js,
            id = 'facebook-jssdk',
            ref = d.getElementsByTagName('script')[0];

        if (d.getElementById(id)) {
            return;
        }

        js = d.createElement('script');
        js.id = id;
        js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";

        ref.parentNode.insertBefore(js, ref);

    }(document));

}]);




