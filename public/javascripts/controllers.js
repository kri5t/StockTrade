'use strict';
/**
 * Created by Brian on 17-11-13.
 */
function IndexCtrl($scope, $http) {
    $http.get('/').
        success(function(data, status, headers, config) {
            $scope.posts = "dwdwdw";
        });
}

function AddUserCtrl($scope, $http, $location) {
    $scope.form = {};
    $scope.addUser = function () {
        $http.post('/api/addUser', $scope.form).
            success(function(data) {
                $location.path('/');
            });
    };
}

function GetUserCtrl($scope, $http, $routeParams) {
    $http.get('/api/users/' + $routeParams.id).
        success(function(data) {
            $scope.user = data.results;
        });

    $http.get('/api/getRatingByUser/' + $routeParams.id).
        success(function(data) {
            $scope.results = data.results;
        });

}

function GetUserListCtrl($scope, $http, $routeParams) {
    $http.get('/api/users/').
        success(function(data) {
            $scope.results = data.results;
        });
}

function GetRatingByStockCtrl($scope, $http, $routeParams) {
    $http.get('/api/stocks/' + $routeParams.id).
        success(function(data) {
            $scope.stock = data.results;
        });

    $http.get('/api/ratings/' + $routeParams.id).
        success(function(data) {
            $scope.results = data.results;
        });
}

function GetRatingByUserCtrl($scope, $http, $routeParams) {
    $http.get('/api/getRatingByUser/' + $routeParams.id).
        success(function(data) {
            $scope.post = data.post;
        });
}

function AddRatingForStockCtrl($scope, $http, $location, $routeParams) {
    $scope.form = {};
    $http.get('/api/getAllStocks').
        success(function(data) {
            $scope.places = data.results;
        });
    $http.get('/api/users/').
        success(function(data) {
            $scope.users = data.results;
        });

    $scope.addRatingForPlace = function () {
        $http.post('/api/ratings', $scope.form).
            success(function(data) {
                console.log(data)
                $location.path('/');
            });
    };
}

function AddStockCtrl($scope, $http, $location) {
    $scope.form = {};
    $scope.addStock = function () {
        $http.post('/api/stocks', $scope.form).
            success(function(data) {
                $location.path('/');
            });
    };
}

function FindStockCtrl($scope, $http, $routeParams) {
    $http.get('/api/stocks/' + $routeParams.id).
        success(function(data) {
            $scope.post = data.post;
        });
}

function FindAllStocksCtrl($scope, $http, $routeParams) {
    $http.get('/api/getAllStocks/').
        success(function(data) {
            $scope.stocks = data.results;
        });
}
