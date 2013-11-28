/**
 * Created by Brian on 17-11-13.
 */
'use strict';

/* Directives */

angular.module('stocktrade.directives', []).
    directive('appVersion', function (version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    });
