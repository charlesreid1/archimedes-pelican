
//////////////////////////////////////
// Tax Directives: Categories Explorer
//
// This file contains Angular directives
// for constructing the categories explore page.
// 

var categoriesexplorer_title_dir = mod.directive('categoriesexplorerTitle', function($compile) {
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

var categoriesexplorer_lead_dir = mod.directive('categoriesexplorerLead', function($compile) {
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

var categoriesexplorer_dir = mod.directive('fullCategoriesExplorer', function($compile) {

    function link(scope, element, attr) {

        scope.status = {
            isopen: false
        };
        
        scope.toggled = function(open) {
            console.log('Dropdown is now: ', open);
        };
        
        scope.toggleDropdown = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopen = !$scope.status.isopen;
        };

        var el = "div#myContent";

        var btn_group = $("<div />", {
            "class" : "btn-group",
            "dropdown" : "",
            "is-open" : "status.isopen"
        }).appendTo(el);

        var btn = $("<button />", {
            type : "button",
            "class" : "btn btn-primary dropdown-toggle",
            "dropdown-toggle" : "",
            "html" : "Select a Category <span class='caret'></span>"
        }).appendTo(btn_group);

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

        console.log('categories button');
    };

    return {
        restrict: "E",
        link: link,
        scope: {}
    }

});



/*
    <!-- Single button -->
    <div class="btn-group" dropdown is-open="status.isopen">

      <button type="button" class="btn btn-primary dropdown-toggle" 
      dropdown-toggle ng-disabled="disabled">

        Button dropdown <span class="caret"></span>
      </button>

      <ul class="dropdown-menu" role="menu">

        <li><a href="#">Action</a></li>
        <li><a href="#">Another action</a></li>
        <li><a href="#">Something else here</a></li>
        <li class="divider"></li>
        <li><a href="#">Separated link</a></li>
      </ul>
    </div>
*/



var categoriesexplorer_dir = mod.directive('fullCategoriesExplorer2', function($compile) {
    function link(scope, element, attr) {

        var el = "div#myContent";

        var btn_grp = $("<div />", {
            "class" : "btn-group"
        }).appendTo(el);

        var btn = $("<button />", {
            type: "button",
            "class" : "btn btn-success dropdown-toggle",
            "data-toggle": "dropdown",
            "aria-expanded" : "false"
        })
        .appendTo(btn_grp);

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
        console.log('categories button');

        //// creating jquery tags:
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

