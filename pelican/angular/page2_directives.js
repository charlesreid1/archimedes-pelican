/////////////////////////
// Directive 

var ngd1 = mod.directive("addbuttonsbutton", function(){
    return {
        restrict: "E",
        template: "<button class='btn btn-large btn-info' addbuttons>Click to add buttons</button>"
    }
});

//Directive for adding buttons on click that show an alert on click
var ngd2 = mod.directive("addbuttons", function($compile){
    return function(scope, element, attrs){
        element.bind("click", function(){
            scope.count++;
            angular.element(document.getElementById('space-for-buttons')).append($compile("<div><button class='btn btn-large btn-info' data-alert="+scope.count+">Show alert #"+scope.count+"</button></div>")(scope));
        });
    };
});

//Directive for showing an alert on click
var ngd3 = mod.directive("alert", function(){
    return function(scope, element, attrs){
        element.bind("click", function(){
            alert("This is alert #"+attrs.alert);
        });
    };
});

var c = mod.controller("Ctrl1", ["$scope",Ctrl1]);

