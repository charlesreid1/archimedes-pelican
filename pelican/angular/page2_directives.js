

/////////////////////////
// Directive 

var ngd0 = mod.directive("helloworld", function(){
    return {
        restrict: "E",
        template: "<p><b>Hello cruel angular world! This is <code>helloworld</code> talking.</b></p>"
    }
});


var ngd1 = mod.directive("populate1", function($compile){
    return function(scope, element, attrs){
        element.bind("click", function(){
            angular.element(document.getElementById('go1')).empty();
            angular.element(document.getElementById('go1')).append($compile("<div><h1>Hello world</h1><p>Now page 1 has been populated from a directive.</p><helloworld></helloworld></div>")(scope));
        });
    };
});

var ngd2 = mod.directive("populate2", function($compile){
    return function(scope, element, attrs){
        element.bind("click", function(){
            angular.element(document.getElementById('go2')).empty();
            angular.element(document.getElementById('go2')).append($compile("<div><h1>Hello world</h1><p>Now page 2 has been populated from a directive.</p><helloworld></helloworld></div>")(scope));
        });
    };
});

var ngd3 = mod.directive("populate3", function($compile){
    return function(scope, element, attrs){
        element.bind("click", function(){
            angular.element(document.getElementById('go3')).empty();
            angular.element(document.getElementById('go3')).append($compile("<div><h1>Hello world</h1><p>Now page 3 has been populated from a directive.</p><helloworld></helloworld></div>")(scope));
        });
    };
});

var c = mod.controller("Ctrl1", ["$scope",Ctrl1]);

