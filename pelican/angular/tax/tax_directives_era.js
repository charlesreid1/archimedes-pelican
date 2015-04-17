
//////////////////////////////////////
// Tax Directives: Categories Explorer
//
// This file contains Angular directives
// for constructing the categories explore page.
// 

// -----------------------------------------------------
// Title
//
var c_title_dir = mod.directive('categoriesExplorerEraTitle', function($compile) {
    function link(scope, element, attr) {
        var el = "div#myContent";

        $(el).empty();

        var h1 = $("<h1 />").appendTo(el);
        var b = $("<b />").text("Explore Tax Breaks by Era")
                .appendTo(h1);
    }
    return {
        restrict: "E",
        link: link,
        scope: {}
    }
});

// -----------------------------------------------------
// Lead
//
var c_lead_dir = mod.directive('categoriesExplorerEraLead', function($compile) {
    function link(scope, element, attr) {
        var el = "div#myContent";

        var txt = $("<p />", { 
            "class": "lead" 
        })
        .text("Explore changes in tax break categories over different decades and presidents.")
        .appendTo(el);
    }
    return {
        link: link,
        restrict: "E",
        scope : {}
    }
});


// -----------------------------------------------------
// Category filter button group
//
var c_button_dir = mod.directive('categoriesExplorerEraButton', function($compile) {
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



///////////////////////////////////////////////
// Streamgraph

var c_indcorp_dir = mod.directive('categoriesExplorerEraStreamgraph', function($compile) {
    function link(scope, element, attr) {
        var pscope = scope.$parent;
        if( !pscope.taxData ) { 
            pscope.$watch('taxData', chartCallback);
        } else {
            chartCallback();
        }
        console.log('here');

        function chartCallback() {

            var margin = {top: 20, right: 40, bottom: 30, left: 30};
            var width = 500 - margin.left - margin.right;
            var height = 400 - margin.top - margin.bottom;
            
            var tooltip = d3.select("body")
                .append("div")
                .attr("class", "remove")
                .style("position", "absolute")
                .style("z-index", "20")
                .style("visibility", "hidden")
                .style("top", "30px")
                .style("left", "55px");

            var el = element[0];
            var br = d3.select(el).append('br');
            var h2 = d3.select(el).append('h2')
                .attr("id","totalyear")
                .append('b')
                .text('Streamgraph');

            var svg = d3.select(el).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


            ///////////////////////////////
            var datearray = [];
            var colorrange = [];
            var format = d3.time.format("%m/%d/%y");
            strokecolor = 'black';
            ///////////////////////////////

            
            pscope.$watch('myfilter',chartUpdate);

            function chartUpdate() {

                taxData = pscope.taxData;
                myfilter = pscope.myfilter;

                catData = taxData.filter(function(d) { return d['omb_cat'] == myfilter; });
                newdata = d3.nest()
                    .key( function(d) { return d.year; } )
                    .sortKeys(d3.ascending)
                    .rollup( function(d) {
                        return {
                            total: d3.sum(d,function(g){return g.total}),
                            corp:  d3.sum(d,function(g){return g.corp }),
                            indv:  d3.sum(d,function(g){return g.indv })
                        }
                    })
                    .entries(catData);

                var xkey = 'year';
                var ykeys = ['corp','indv'];

                // data_array is a pair of arrays, 
                // containing time series vectors 
                // of coordinates (x,y)
                var data_array = ykeys.map(function (k) {
                    return newdata.map(function(e, i) { 
                        return {x: +e.key, y: e.values[k]/1000000}; 
                    })
                });

                var stack = d3.layout.stack().offset("silhouette");
                layers0 = stack(data_array);

                var x = d3.scale.linear()
                    .range([0, width]);
                
                var y = d3.scale.linear()
                    .range([height, 0]);
                
                var z = d3.scale.ordinal()
                    .domain(ykeys)
                    .range(["steelblue", "orange"]);

                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom");

                var yAxis = d3.svg.axis()
                    .scale(y);
                
                var yAxisr = d3.svg.axis()
                    .scale(y);

                x.domain([
                        d3.min( layers0, function(layer) { 
                            return d3.min(layer, function(z) { return z.x; }); 
                        }),
                        d3.max( layers0, function(layer) { 
                            return d3.max(layer, function(z) { return z.x; }); 
                        })
                ]);

                y.domain([
                        0, 
                        d3.max(layers0, function(layer) { 
                            return d3.max(layer, function(d) { return d.y0 + d.y; }) 
                        })
                ]);

                var area = d3.svg.area()
                    .x(function(d)  { return x(d.x); })
                    .y0(function(d) { return y(d.y0); })
                    .y1(function(d) { return y(d.y0 + d.y); });

                svg.selectAll("path").remove();
                svg.selectAll("path")
                    .data(layers0)
                    .enter()
                    .append('path')
                    .attr('d',area)
                    .attr('fill',function(layer,i) { 
                        return z(i)
                    });

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);
                
                svg.append("g")
                    .attr("class", "y axis")
                    .attr("transform", "translate(" + width + ", 0)")
                    .call(yAxis.orient("right"));
            
                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis.orient("left"));
            
                /*
                    .on("mousemove", function(d, i) {
                      mousex = d3.mouse(this);
                      mousex = mousex[0];
                      var invertedx = x.invert(mousex);
                      invertedx = invertedx.getMonth() + invertedx.getDate();
                      var selected = (d.values);
                      for (var k = 0; k < selected.length; k++) {
                        datearray[k] = selected[k].date
                        datearray[k] = datearray[k].getMonth() + datearray[k].getDate();
                      }
            
                      mousedate = datearray.indexOf(invertedx);
                      pro = d.values[mousedate].value;
            
                      d3.select(this)
                      .classed("hover", true)
                      .attr("stroke", strokecolor)
                      .attr("stroke-width", "0.5px"), 
                      tooltip.html( "<p>" + d.key + "<br>" + pro + "</p>" ).style("visibility", "visible");
                      
                    })
                    .on("mouseout", function(d, i) {
                     svg.selectAll(".layer")
                      .transition()
                      .duration(250)
                      .attr("opacity", "1");
                      d3.select(this)
                      .classed("hover", false)
                      .attr("stroke-width", "0px"), tooltip.html( "<p>" + d.key + "<br>" + pro + "</p>" ).style("visibility", "hidden");
                })
                  
                var vertical = d3.select(".chart")
                      .append("div")
                      .attr("class", "remove")
                      .style("position", "absolute")
                      .style("z-index", "19")
                      .style("width", "1px")
                      .style("height", "380px")
                      .style("top", "10px")
                      .style("bottom", "30px")
                      .style("left", "0px")
                      .style("background", "#fff");
            
                d3.select(".chart")
                    .on("mousemove", function(){  
                       mousex = d3.mouse(this);
                       mousex = mousex[0] + 5;
                       vertical.style("left", mousex + "px" )})
                    .on("mouseover", function(){  
                       mousex = d3.mouse(this);
                       mousex = mousex[0] + 5;
                       vertical.style("left", mousex + "px")});
                });
                */
            };
        };
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
