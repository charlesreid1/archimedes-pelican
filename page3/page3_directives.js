var dir_helloworld = mod.directive("helloworld", function(){
    return {
        restrict: "E",
        template: "<p><b>Hello cruel angular world! This is <code>helloworld</code> talking.</b></p>"
    }
});

var myid = 'myContent';

var ngd1 = mod.directive("home", function($compile){
    return function(scope, element, attrs){
        element.bind("click", function(){
            angular.element(document.getElementById(myid)).empty();
            angular.element(document.getElementById(myid)).append($compile("<div><h1>Hello world</h1><p>Welcome home. This message populated by a directive.</p><helloworld></helloworld></div>")(scope));
        });
    };
});

var ngd2 = mod.directive("categories", function($compile){
    return function(scope, element, attrs){
        element.bind("click", function(){
            angular.element(document.getElementById(myid)).empty();
            angular.element(document.getElementById(myid)).append($compile(
                    "<div><h1>Hello world</h1><p>Now category page has been populated from a directive.</p><helloworld></helloworld></div>"
            )(scope));
        });
    };
});

var ngd3 = mod.directive("singleset", function($compile){
    return function(scope, element, attrs){
        element.bind("click", function(){
            angular.element(document.getElementById(myid)).empty();
            angular.element(document.getElementById(myid)).append($compile(
                    "<div><h1>Hello world</h1><p>Now single category page has been populated from a directive.</p><helloworld></helloworld></div>"
            )(scope));
        });
    };
});

var ngd4 = mod.directive("sunburst", function($compile){
    return function(scope, element, attrs){
        element.bind("click", function(){
            angular.element(document.getElementById(myid)).empty();
            angular.element(document.getElementById(myid)).append($compile(
                    "<div><h1>Hello world</h1><p>Now every category page has been populated from a directive.</p><helloworld></helloworld></div>"
            )(scope));
        });
    };
});

var ngd5 = mod.directive("end", function($compile){
    return function(scope, element, attrs){
        element.bind("click", function(){
            angular.element(document.getElementById(myid)).empty();
            angular.element(document.getElementById(myid)).append($compile(
                    "<div><h1>Hello world</h1><p>Now end page has been populated from a directive.</p><helloworld></helloworld></div>"
            )(scope));
        });
    };
});

var ngd6 = mod.directive("explore", function($compile){
    return function(scope, element, attrs){
        element.bind("click", function(){
            angular.element(document.getElementById(myid)).empty();
            angular.element(document.getElementById(myid)).append($compile(
                    "<div><h1>Hello world</h1><p>Now explore page has been populated from a directive.</p><helloworld></helloworld></div>"
            )(scope));
        });
    };
});
