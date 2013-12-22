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