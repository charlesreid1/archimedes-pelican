/////////////////////////
// Module

var mod = angular.module("myApp",[],function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    }
);

var c = mod.controller("Ctrl1", ["$scope","$http","$interval",Ctrl1]);

