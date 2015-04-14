//////////////////////////////////////
// Tax Directives: Categories List
//
// This file contains Angular directives
// for constructing the categories explore page.
// 

var categorieslist_title_dir = mod.directive('categorieslistTitle', function($compile) {
    function link(scope, element, attr) {
        var el = "div#myContent";

        $(el).empty();

        var h1 = $("<h1 />").appendTo(el);
        var b = $("<b />").text("Tax Break Category Explorer")
                .appendTo(h1);
    }
    return {
        restrict: "E",
        link: link,
        scope: {}
    }
});

var categorieslist_lead_dir = mod.directive('categorieslistLead', function($compile) {
    function link(scope, element, attr) {
        var el = "div#myContent";

        var txt = $("<p />", { 
            "class": "lead" 
        })
        .text("Explore each tax break category in greater detail with these interactive charts.")
        .appendTo(el);
    }
    return {
        link: link,
        restrict: "E",
        scope : {}
    }
});

var categorieslist_dir = mod.directive('fullCategoriesList', function() {

    function link(scope, element, attr) {

        //var btn_grp = $("<div />", {
        //    id : "whatevs"
        //}).appendTo(el);

        ////console.log( $(el) );

        /*
        var btn_grp = $("<div />", {
            "class" : "btn-group"
        }).appendTo($(el));

        var btn = $("<button />", {
            type: "button",
            "class" : "btn btn-success dropdown-toggle",
            "data-toggle": "dropdown",
            "aria-expanded" : "false",
            "html" : "Select a Category <span class='caret'>"
        }).appendTo(btn_grp);

        var ul = $("<ul />", {
            "class" : "dropdown-menu",
            role: "menu"
        }).appendTo(btn_grp);

        var divider = $("<li />", {
            "class" : "divider"
        }).appendTo(ul);

        scope.categorieslist.forEach(function(j) { 
            var li = $("<li />", {}).appendTo(ul);
            var a = $("<a />", {
                href : "#"
            }).text(j).appendTo(li);
        });
        */

        //// How to create jquery tags:
        //// via http://stackoverflow.com/questions/2217409/jquery-best-practice-for-creating-complex-html-fragments
        //var e = $("<a />", {
        //    href : "#",
        //    "class" : "whatevs",
        //    title: "whatevs"
        //});
        //$(el).append(e);

    };

    return {
        restrict: "E",
        link: link,
        scope: {
            categorieslist: '='
        }
    };

});

