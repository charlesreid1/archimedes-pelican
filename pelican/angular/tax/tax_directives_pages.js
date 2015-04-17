//////////////////////////////////////
// Tax Directives: Pages 
//
// This file contains Angular directives
// that are called when the user clicks on 
// page names in the navgiation element.
//
// This controls the actions taken when 
// loading each page. This includes
// compiling/inserting chart directives,
// etc.
// 

var dir_helloworld = mod.directive("helloworld", function(){
    return {
        restrict: "E",
        template: "<p><b>Hello cruel angular world! This is <code>helloworld</code> talking.</b></p>"
    }
});





var myid = 'div#myContent';

var ngd1 = mod.directive("intro", function($compile){
    return function(scope, element, attrs){

        scope.clicked = function() { 

            // make button active
            $("a.navpills").parent().removeClass("active");
            $("a#intro").parent().addClass("active");

            // add content and directive
            $(myid).empty();
            $(myid).append($compile(
                    "<div>" + 
                    "<intro-title></intro-title>" + 
                    "<intro-lead></intro-lead>" + 
                    "</div>" 
            )(scope));

        };
        element.bind("click",scope.clicked);
    };
});

var ngd2 = mod.directive("categories", function($compile){
    return function(scope, element, attrs){
        element.bind("click", function(){

            // make button active
            $("a.navpills").parent().removeClass("active");
            $("a#categories").parent().addClass("active");

            // add content and directive
            $(myid).empty();
            $(myid).append($compile(
                    "<div>" + 
                    "<categories-title></categories-title>" + 
                    "<categories-lead></categories-lead>" + 
                    "<taxcategories treeified='treeified'></taxcategories>" + 
                    "</div>" 
            )(scope));

        });
    };
});

var ngd3 = mod.directive("categoriesexplorer", function($compile){
    return function(scope, element, attrs){
        element.bind("click", function(){

            // make button active
            $("a.navpills").parent().removeClass("active");
            $("a#categoriesexplorer").parent().addClass("active");

            // add content and directive
            $(myid).empty();
            $(myid).append($compile(
                    "<div>" + 
                    "<categories-explorer-title></categories-explorer-title>" + 
                    "<categories-explorer-lead></categories-explorer-lead>" + 
                    "<categories-explorer-button myfilter='myfilter' categorieslist='categorieslist'></categories-explorer-button>" +
                    "<categories-explorer-bar myfilter='myfilter' taxData='taxData'></categories-explorer-bar>" +
                    "<categories-explorer-indcorp myfilter='myfilter' taxData='taxData'></categories-explorer-indcorp>" +
                    "</div>"
            )(scope));
        });
    };
});

var ngd4 = mod.directive("sunburst", function($compile){
    return function(scope, element, attrs){
        element.bind("click", function(){
            $(myid).empty();
            $(myid).append($compile(
                    "<div><h1>Hello world</h1><p>Now every category page has been populated from a directive.</p><helloworld></helloworld></div>"
            )(scope));
        });
    };
});

var ngd5 = mod.directive("end", function($compile){
    return function(scope, element, attrs){
        element.bind("click", function(){

            // make button active
            $("a.navpills").parent().removeClass("active");
            $("a#end").parent().addClass("active");

            $(myid).empty();
            $(myid).append($compile(
                    "<div><h1>Hello world</h1><p>Now end page has been populated from a directive.</p><helloworld></helloworld></div>"
            )(scope));
        });
    };
});

var ngd6 = mod.directive("explore", function($compile){
    return function(scope, element, attrs){
        element.bind("click", function(){

            // make button active
            $("a.navpills").parent().removeClass("active");
            $("a#explore").parent().addClass("active");

            $(myid).empty();
            $(myid).append($compile(
                    '<div><h1>Hello world</h1><p>Now explore page has been populated from a directive.</p><helloworld></helloworld></div>'
            )(scope));
        });
    };
});


