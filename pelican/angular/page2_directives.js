

/////////////////////////
// Directive 

var ngd1 = mod.directive("populatebutton", function(){
    return {
        restrict: "E",
        template: "<button class='btn btn-large btn-info' populate>Click to populate page 2</button>"
    }
});

//Directive for adding buttons on click that show an alert on click
var ngd2 = mod.directive("populate", function($compile){
    return function(scope, element, attrs){
        element.bind("click", function(){
            scope.count++;
            //angular.element(document.getElementById('space-for-buttons')).append($compile("<div><button class='btn btn-large btn-info' data-alert="+scope.count+">Show alert #"+scope.count+"</button></div>")(scope));
            angular.element(document.getElementById('go2')).append($compile("<div><h2>Hello world</h2><p>Now this page is populated.</p></div>")(scope));
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

