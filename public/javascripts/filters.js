/**
 * Created by Brian on 17-11-13.
 */
'use strict';

/* Filters */

angular.module('stocktrade.filters', []).
    filter('interpolate', function (version) {
        return function (text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        }
    });
