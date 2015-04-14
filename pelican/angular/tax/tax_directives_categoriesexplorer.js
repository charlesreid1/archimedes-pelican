
//////////////////////////////////////
// Tax Directives: Categories Explorer
//
// This file contains Angular directives
// for constructing the categories explore page.
// 

var c_title_dir = mod.directive('categoriesExplorerTitle', function($compile) {
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

var c_lead_dir = mod.directive('categoriesExplorerLead', function($compile) {
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




// -----------------------------------------------------
// Construct the categories explorer chart
//

var c_button_dir = mod.directive('categoriesExplorerButton', function($compile) {
    function link(scope, element, attr) {

        var el = element[0];

        // construct button group,
        // then compile html with angular,
        // then add to document

        var btn_group = $("<div />", {
            "class" : "btn-group"
        });

        var btn = $("<button />", {
            type : "button",
            "class" : "btn btn-success dropdown-toggle",
            "id" : "categorybutton",
            "data-toggle" : "dropdown",
            "aria-expanded" : "false",
            "html" : '[[myfilter]] <span class="caret"></span>'
        }).appendTo(btn_group);

        var ul = $("<ul />", {
            "class" : "dropdown-menu",
            role: "menu"
        }).appendTo(btn_group);

        var divider = $("<li />", {
            "class" : "divider"
        }).appendTo(ul);

        scope.categorieslist.forEach(function(c,i) { 
            var li = $("<li />", {}).appendTo(ul);
            var a = $("<a />", {
                "id" : i,
                cat : ""
            }).text(c).appendTo(li);
        });

        var bg = $compile(btn_group.html())(scope);
        angular.element($(el)).append(bg);

        scope.$apply();
    };

    return {
        restrict: "E",
        link: link,
        scope: {
            myfilter : '=',
            categorieslist : '='
        }
    }
});

var cdir = mod.directive("cat", function($compile) { 
    return function(scope, element, attrs){
        element.bind("click", function(){
            var id = +attrs.id;
            var cat = scope.categorieslist[id];
            scope.myfilter = cat;
            scope.$apply();
        });
    };
});


