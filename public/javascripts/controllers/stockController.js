'use strict';

function AddStockCtrl($scope, $http, $location) {
    $scope.form = {};
    $scope.addStock = function () {
        $http.post('/api/stocks', $scope.form).
            success(function(data) {
                $location.path('/');
            });
    };
}

function FindStockCtrl($scope, $http, $routeParams, HttpService) {
    HttpService.getStockByID().then( function(data) {
        $scope.post = data.data.results;
    });
}

function FindAllStocksCtrl($scope, $http, $routeParams,HttpService) {
    HttpService.getAllStocks().then( function(data) {
        $scope.stocks = data.data.results;
    });
}

function SearchForStockCtrl($scope, $http, $location,$rootScope) {
    $scope.$watch('form.searchtext',function() {
        $scope.stocks = {};
        if($scope.form !== undefined) {
            $http.get('/api/stocks/' + $scope.form.searchtext +'/').
                success(function(data) {
                    if(data.results === undefined || data.results.length === 0) {
                        var noResults = {stock_id: "Aktien eksisterer ikke",name: "Opret aktie med knappen til højre!"}
                        $scope.stocks = new Array(noResults);
                    } else {
                        $scope.stocks = data.results;
                    }
                });
        }
        $scope.stocks = {};
    });
    $scope.shiftToResult = function() {
        var searchText = $scope.form.searchtext.split(",");
        var resOne = searchText[0].trim();
        $location.path("getRatingByStockID/" + resOne);
        $scope.form.searchtext = "";
        $scope.stocks = {};
    }

    $scope.searchForPlace = function() {
        if($scope.form !== undefined) {
            $http.get('/api/places/' + $scope.form.searchtext +'/').
                success(function(data) {
                    $rootScope.searchStockResult = data.results;
                    $location.path('/getStockByID/');
                });
        }
    }
}
