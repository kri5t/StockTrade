'use strict';

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