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

var ng;
var directives = [];

ng = mod.directive("intro", function($compile){
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
directives.push(ng);

ng = mod.directive("categories", function($compile){
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
directives.push(ng);

ng = mod.directive("categoriesexplorer", function($compile){
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
                    "<categories-explorer-streamgraph myfilter='myfilter' taxData='taxData'></categories-explorer-streamgraph>" +
                    "</div>"
            )(scope));
        });
    };
});
directives.push(ng);

ng = mod.directive("categoriesexplorerera", function($compile){
    return function(scope, element, attrs){
        element.bind("click", function(){

            // make button active
            $("a.navpills").parent().removeClass("active");
            $("a#categoriesexplorerera").parent().addClass("active");

            // add content and directive
            $(myid).empty();
            $(myid).append($compile(
                    "<div>" + 
                    "<categories-explorer-era-title></categories-explorer-era-title>" + 
                    "<categories-explorer-era-lead></categories-explorer-era-lead>" + 
                    "<categories-explorer-era-button myfilter='myfilter' categorieslist='categorieslist'></categories-explorer-era-button>" +
                    "<categories-explorer-era-streamgraph-group myfilter='myfilter' taxData='taxData'></categories-explorer-era-streamgraph-group>" +
                    "</div>"
            )(scope));
        });
    };
});
directives.push(ng);

ng = mod.directive("sunburst", function($compile){
    return function(scope, element, attrs){
        element.bind("click", function(){

            // make button active
            $("a.navpills").parent().removeClass("active");
            $("a#sunburst").parent().addClass("active");

            // add content and directive
            $(myid).empty();
            $(myid).append($compile(
                    "<div>" + 
                    "<sunburst-title></sunburst-title>" + 
                    "<sunburst-lead></sunburst-lead>" + 
                    "<sunburst-switch totalcount='totalcount' treeified='treeified'></sunburst-switch>" + 
                    "<sunburst-year sunburst_yr='sunburst_yr' treeified='treeified'></sunburst-year>" + 
                    "<plainsunburst totalcount='totalcount' treeified='treeified'></plainsunburst>" +
                    //"<sunburst treeified='treeified'></sunburst>" +
                    "</div>"
            )(scope));
        });
    };
});
directives.push(ng);




ng = mod.directive("end", function($compile){
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
directives.push(ng);

ng = mod.directive("explore", function($compile){
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
directives.push(ng);


