/////////////////////////
// Module

var bootstrapui = angular.module('myApp', ['ui.bootstrap']);

var mod = angular.module("myApp",[],function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    }
);

var c = mod.controller("Ctrl1", ["$scope",Ctrl1]);

