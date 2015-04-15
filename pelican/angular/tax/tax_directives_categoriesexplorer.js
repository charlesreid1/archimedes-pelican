
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
// Construct the categories explorer button group
//

var c_button_dir = mod.directive('categoriesExplorerButton', function($compile) {
    function link(scope, element, attr) {
        if( !scope.categorieslist ) { 
            scope.$watch('categorieslist',doit);
        } else {
            doit();
        }
        function doit() {

            var el = element[0];

            // construct button group,
            // then compile html with angular,
            // then add to document


            var btn_group = $("<div />", {
                "class" : "row"
            }).append( $("<div />", {
                "class" : "btn-group"
            })
            );

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

        }
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



// -----------------------------------------------------
// Construct the categories explorer chart group
//

var c_chart_dir = mod.directive('categoriesExplorerChart', function($compile) {
    function link(scope, element, attr) {
        var pscope = scope.$parent;
        if( !pscope.taxData ) { 
            pscope.$watch('taxData', chartCallback);
        } else {
            chartCallback();
        }
        function chartCallback() {

            var margin = {
                top: 10, 
                right: 100, 
                bottom: 10, 
                left: 100
            };
            
            var width = 800 - margin.right - margin.left,
                height = 400 - margin.top - margin.bottom;

            var el = element[0];
            var br = d3.select(el).append('br');//angular.element($(el)).append($("<p />",{"html":"&nbsp"}));
            var svg = d3.select(el).append('svg')
                    .attr("width", width + margin.right + margin.left)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            pscope.$watch('myfilter', chartUpdate);
            //if( !pscope.myfilter ) { 
            //} else {
            //    chartUpdate();
            //}

            if( !pscope.categorieslist) { 
                pscope.$watch('categorieslist', chartUpdate);
            } else {
                chartUpdate();
            }

            function chartUpdate() {
                if(!pscope.myfilter){return};
                if(!pscope.categorieslist){return};

                console.log('----------------');
                console.log( pscope.myfilter );
                console.log( pscope.categorieslist.indexOf(scope.myfilter) );


                data = {};

                // Draw a bar chart of amounts:
                // - nominal $
                // - 2015 $
                // - pct tax expenditures

                var xScale = d3.scale.ordinal()
                    .domain(d3.range(data.length))
                    .rangeRoundBands([0, width], 0.05); 

                var yScale = d3.scale.linear()
                    .domain([0, d3.max(data, function(d) {return d.value;})])
                    .range([0, height]);



                key = 'year';
                val = 'total';


                //Create bars
                svg.selectAll("rect")
                   .data(data)
                   .enter()
                   .append("rect")
                   .attr("x", function(d, i) {
                        return xScale(i);
                   })
                   .attr("y", function(d) {
                        return height - yScale(d[val]);
                   })
                   .attr("width", xScale.rangeBand())
                   .attr("height", function(d) {
                        return yScale(d[val]);
                   })
                   .attr("fill", function(d) {
                        return "steelblue";//rgb(0, 0, 1)" + (d[value] * 10) + ")";
                   })



            };

        }
    };
    return {
        link: link,
        restrict: "E",
        scope: {
            myfilter : '=',
            taxData : '='
        }
    };

});


