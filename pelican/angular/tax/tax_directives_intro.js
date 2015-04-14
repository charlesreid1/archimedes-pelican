//////////////////////////////////////
// Tax Directives: Intro
//
// This file contains Angular directives
// for constructing the intro page.
// 

var intro_title_dir = mod.directive('introTitle', function($compile) {
    function link(scope, element, attr) {
        var el = "div#myContent";

        var h1 = $("<h1 />").appendTo(el);
        var b = $("<b />").text("Introduction")
                .appendTo(h1);
    }
    return {
        restrict: "E",
        link : link,
        scope : {}
    }
});

var intro_lead_dir = mod.directive('introLead', function($compile) {
    function link(scope, element, attr) {
        var el = "div#myContent";

        var p = $("<p />", {
            "class" : "lead"
        })
        .text("Welcome to the Tax Breaks Visualization Project!")
        .appendTo(el);

        var contents = ["This page contains visualizations of the <a href='https://www.nationalpriorities.org/analysis/2014/big-money-tax-breaks/complete-data-on-tax-breaks/'>" 
                                   + "Tax Breaks Data Set</a> provided by <a href='https://www.nationalpriorities.org/'>The National Priorities Project</a>.",
                        "Begin your journey by selecting from the pages on the navigation menu on the left."];
        
        contents.forEach(function(line) {
            var p = $("<p />", {
                "class" : "normal",
                "html" : line
            }).appendTo(el);
        });
    }

    return {
        restrict: "E",
        link: link,
        scope: {}
    }
});

