/////////////////////////
// Module

var mod = angular.module('myApp',[],function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    }
);
