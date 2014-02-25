/**
 * Created by Brian on 17-11-13.
 */
'use strict';

/* Services */

var stockTradeServices = angular.module('stocktrade.services', []);

stockTradeServices.factory('Auth', function($q, $http, $timeout, $location, $rootScope){
    return {
        checkLogin: function(callback) {
            var deferred = $q.defer();
            $http.get('/loggedin').then(function(userData) {

                var user = userData.data.user;
                if (user !== '0') {
                    $timeout(deferred.resolve, 0);

                    $rootScope.facebook_user = user.id;
                    $rootScope.facebook_user_name = user.displayName;
                    $rootScope.DisplayFacebookLogin = false;
                    $rootScope.DisplayLoggedIn = true;

                    callback(true);
                } else {
                    $rootScope.message = 'You need to log in.';
                    $timeout(function(){deferred.reject();}, 0);
                    $rootScope.DisplayFacebookLogin = true;
                    $rootScope.DisplayLoggedIn = false;

                    $rootScope.facebook_user = "";
                    $rootScope.facebook_user_name = "";

                    callback(false);
                }
            });
        },
        logout: function() {
            var deferred = $q.defer();
            $http.post('/logout').success(function(res) {
                console.log(res);
            });
        }
    };
});

stockTradeServices.factory('HttpService', function($http){
    return {
        getAllStocks: function () {
            return $http.get('/api/getAllStocks/').
                success(function(data) {
                    return data.results;
                });
        },
        auth: function () {
            return $http.get('/auth/facebook').
                success(function(data) {
                    return data.results;
                });
        },
        getStockByID: function (id) {
            return $http.get('/api/stocks/' + $routeParams.id).
                success(function(data) {
                    return data.results;
                });
        },
        getRatingsForStock: function (place) {
            return $http.get('/api/ratings/' + place).
                success(function(data) {
                    if(result === undefined) {
                        return data.results;
                    } else {
                        return data.results;
                    }
                });
        },
        getUser: function (user) {
            return $http.get('/api/users/' + user).
                success(function(data) {
                    return data.results;
                });
        }
    };
});