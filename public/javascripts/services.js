/**
 * Created by Brian on 17-11-13.
 */
'use strict';

/* Services */

var stockTradeServices = angular.module('stocktrade.services', []);

stockTradeServices.factory('Stocks', ['$resource',
    function($resource){
        return $resource('api/stocks/:phoneId.json', {}, {
            query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
        });
    }]);