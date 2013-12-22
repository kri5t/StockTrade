/**
 * Created by Brian on 17-11-13.
 */
'use strict';

/* Services */

var stockTradeServices = angular.module('stocktrade.services', []);

stockTradeServices.factory('Auth', function($q, $http,$timeout,$location,$rootScope){
    return {
        checkLogin: function(callback) {
            var deferred = $q.defer();
            $http.get('/loggedin').success(function(user) {
                console.log("i logged in");
                if (user !== '0') {
                    $timeout(deferred.resolve, 0);
                    $rootScope.facebook_user = $rootScope.user.id;
                    $rootScope.DisplayFacebookLogin = false;
                    $rootScope.DisplayLoggedIn = true;
                    callback(true);
                } else {
                    $rootScope.message = 'You need to log in.';
                    $timeout(function(){deferred.reject();}, 0);
                    $rootScope.DisplayFacebookLogin = true;
                    $rootScope.DisplayLoggedIn = false;
                    callback(false);
                }
            });
        },
        logout: function() {
            var deferred = $q.defer();
            $http.post('/logout').success(function(res) {
                console.log(res);
            });
        },
        getLoginStatus: function(callback) {

            FB.getLoginStatus(function(stsResp) {
                console.log(stsResp);
                if(stsResp.authResponse) {
                    // User is already logged in lyl
                    callback(true);
                } else {
                    // User is not logged in.
                    callback(false);
                }
            });
        }
    };
});

stockTradeServices.factory('srvAuth', function($http,$rootScope,$route,Auth,HttpService,$location,$window){
    return {
        watchLoginChange: function() {
            var _self = this;

            var loginStatus = function(result) {
                if(!result) {
                    $rootScope.DisplayFacebookLogin = true;
                    $rootScope.DisplayLoggedIn = false;
                    Auth.logout();
                }
            }
            Auth.getLoginStatus(loginStatus);

            FB.Event.subscribe('auth.authResponseChange', function(response) {
                if (response.status === 'connected') {

                    /*
                     The user is already logged,
                     is possible retrieve his personal info
                     */
                    _self.getUserInfo();

                }
                else {
                    Auth.logout();
                    if (!$route.current.access.isFree) {
                        $location.path("/login");
                    }
                    $rootScope.DisplayFacebookLogin = true;
                    $rootScope.DisplayLoggedIn = false;

                    /*
                     The user is not logged to the app, or into Facebook:
                     destroy the session on the server.
                     */
                }

            });
        },
        getUserInfo: function() {

            var _self = this;

            FB.api('/me', function(response) {

                $rootScope.$apply(function() {

                    $rootScope.user = _self.user = response;

                    $rootScope.facebook_user = $rootScope.user.id;
                    console.log("redirct?");

                    var callback = function(result) {
                        console.log("inside redirect");
                        if(!result) {
                            $window.location.replace("/auth/facebook");
                        }
                    }
                    Auth.checkLogin(callback);
                });
            });
            /* make the API call */
        }
    }
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