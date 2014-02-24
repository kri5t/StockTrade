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

    $scope.getStock = function(val) {
        return $http.get('/api/stocks/' + val +'/').then(function(res) {
            if(res.data.results === undefined || res.data.results.length === 0) {
                var results = new Array({
                    stock_id: "Aktien eksisterer ikke",
                    name: "Opret aktie med knappen til højre!"
                });
                return results;
            } else {
                return res.data.results;
            }
        });
    };

	$scope.shiftToResult = function($item) {
        var resOne = $item.stock_id;

        if(resOne.indexOf("eksisterer ikke") != -1) {
            $location.path("addPlace");
        }else {
            $location.path("getRatingByStockID/" + resOne);
        }
        $scope.searchtext = "";
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
