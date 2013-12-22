'use strict';

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
    $scope.form.stock_id = $routeParams.stockID;

    $http.get('/api/users/').
        success(function(data) {
            $scope.users = data.results;
        });

    $scope.addRatingForPlace = function () {
        $http.post('/api/ratings', $scope.form).
            success(function(data) {

                $location.path('/');
            });
    };
}