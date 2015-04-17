
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

var c_chart_dir = mod.directive('categoriesExplorerBar', function($compile) {
    function link(scope, element, attr) {
        var pscope = scope.$parent;
        if( !pscope.taxData ) { 
            pscope.$watch('taxData', chartCallback);
        } else {
            chartCallback();
        }
        function chartCallback() {

            console.log('in bar chart callback');

            var margin = {
                top:    10, 
                right:  40, 
                bottom: 10, 
                left:   40
            };
            
            var width   = 600 - margin.right - margin.left,
                height  = 300 - margin.top   - margin.bottom;

            var el = element[0];
            var br = d3.select(el).append('br');
            var h2 = d3.select(el).append('h2')
                .attr("id","totalyear")
                .append('b')
                .text('Tax Break Totals by Year');

            var svg = d3.select(el).append('svg')
                    .attr("width", width + margin.right + margin.left)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            pscope.$watch('myfilter', chartUpdate);

            if( !pscope.categorieslist) { 
                pscope.$watch('categorieslist', chartUpdate);
            } else {
                chartUpdate();
            }

            function chartUpdate() {

                if(!pscope.myfilter){return};
                if(!pscope.categorieslist){return};

                taxData = pscope.taxData;
                myfilter = pscope.myfilter;
                categorieslist = pscope.categorieslist;

                /*
                0: "omb_cat"
                1: "name"
                2: "year"
                3: "corp"
                4: "indv"
                5: "total"
                6: "gdp"
                7: "gdp_price_index"
                8: "corp_adj"
                9: "indv_adj"
                10: "total_adj"
                11: "percent_corp"
                12: "percent_gdp"
                13: "percent_indv"
                14: "percent_omb_cat"
                15: "percent_total"
                16: "percent_change"
                17: "orig_name"
                18: "id"
                */

                var xkey = 'year';
                var ykey = 'total';

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

                /*
                catData.forEach(function(d) { 
                    var yr  =  d[xkey];
                    var tot = +d[ykey];
                    // if year is not in our dictionary, add it.
                    // otherwise, increment it.
                    if(Object.keys(total_yrData).indexOf(yr)<0) {
                        total_yrData[yr] = tot;
                    } else {
                        total_yrData[yr] += tot;
                    }
                });
                data = [];
                Object.keys(total_yrData).forEach(function(k) {
                    dat = {}
                    dat[xkey] = k;
                    dat[ykey] = total_yrData[k];
                    data.push(dat);
                });
                */

                // Draw a bar chart of amounts:
                // - nominal $ (total)

                var xScale = d3.scale.ordinal()
                    .domain( d3.range(newdata.length) )
                    .rangeRoundBands([0,width], 0.05);

                var yScale = d3.scale.linear()
                    .domain([
                            //d3.min(newdata, function(d) {
                            //    return d.values[ykey];
                            //}), 
                            0,
                            d3.max(newdata, function(d) {
                                return d.values[ykey]/1000000;
                            }) 
                    ])
                    .range([0, height]);

                //console.log(newdata);

                // Create bars
                // (but remove them first)
                //
                // NOTE: instead of using remove() and then enter(), 
                // there should be some way to go through and update properties and redraw
                // and then animate the transition.
                //
                svg.selectAll("rect").remove();
                svg.selectAll("rect")
                    .data(newdata)
                    .enter()
                    .append("rect")
                    .attr("x", function(d, i) {
                        //console.log( "x : "+xScale(i) );
                        return xScale(i);
                    })
                    .attr("y", function(d) {
                        //console.log(d);
                        //console.log( "y : "+yScale(d.values[ykey]) );
                        return height - yScale(d.values[ykey]/1000000 );
                    })
                    .attr("width", xScale.rangeBand())
                    .attr("height", function(d,i) { 
                        //console.log("height "+i+": " + yScale(d[ykey]));
                        return yScale( d.values[ykey]/1000000 ); 
                    })
                    .attr("fill", function(d) {
                        return "steelblue";//rgb(0, 0, 1)" + (d[value] * 10) + ")";
                    })
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


var c_indcorp_dir = mod.directive('categoriesExplorerIndcorp', function($compile) {
    function link(scope, element, attr) {
        var pscope = scope.$parent;
        if( !pscope.taxData ) { 
            pscope.$watch('taxData', chartCallback);
        } else {
            chartCallback();
        }

        function chartCallback() {

            console.log('in indcorp chart callback');

            var margin = {
                top:    10, 
                right:  40, 
                bottom: 10, 
                left:   40
            };

            var width = 300,
                height = 200;
            
            var el = element[0];
            var br = d3.select(el).append('br');
            var h2 = d3.select(el).append('h2')
                .attr("id","totalyear")
                .append('b')
                .text('Tax Break Totals Streamgraph');

            var color = d3.scale.linear()
                .range(["#ada", "#565"]);


            var svg = d3.select(el).append('svg')
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .append("g");



            pscope.$watch('myfilter', chartUpdate);

            if( !pscope.categorieslist) { 
                pscope.$watch('categorieslist', chartUpdate);
            } else {
                chartUpdate();
            }

            function chartUpdate() {

                if(!pscope.myfilter){return};
                if(!pscope.categorieslist){return};

                taxData = pscope.taxData;
                myfilter = pscope.myfilter;
                categorieslist = pscope.categorieslist;

                var xkey = 'year';
                var ykeys = ['corp','indv'];

                var catData = taxData.filter(function(d) { return d['omb_cat'] == myfilter; });

                var newdata = d3.nest()
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

                //console.log(JSON.stringify(newdata));

                // data_array is a pair of arrays, 
                // containing time series vectors 
                // of coordinates (x,y)
                var data_array = ykeys.map(function (k) {
                
                    // this returns a set of {x,y} pairs 
                    // that create a time series
                    // for our key of interest. 
                    return newdata.map(function(e, i) { 
                
                        // x = year
                        // y = value of variable (corp/indv) for given year
                        return {x: +e.key, y: e.values[k]}; 
                
                    })
                
                });

                /*
                var xScale = d3.scale.linear()
                    .domain(
                        [   d3.min(data_array, function(da) {
                                return d3.min(da,function(da2){return da2.x}); 
                            }), 
                            d3.max(data_array, function(da) {
                                return d3.max(da,function(da2){return da2.x}); 
                            }) 
                        ]
                    )
                    .range([0,width]);
                */
                var xScale = d3.scale.linear()
                    .domain([1974,2019])
                    .range([0,width]);

                /*
                var yScale = d3.scale.linear()
                    .domain([
                            d3.min(data_array, function(da) {
                                return d3.min(da,function(da2){return da2.y0 + da2.y}); 
                            }), 
                            d3.max(data_array, function(da) {
                                return d3.max(da,function(da2){return da2.y0 + da2.y}); 
                            }) 
                    ])
                    .range([height,0]);
                */
                var yScale = d3.scale.linear()
                    .domain([0,1000000000])
                    .range([height,0]);


                colors = ['steelblue','pink'];

                // now we stack data_array
                var stack = d3.layout.stack().offset('wiggle');
                var layers = stack(data_array);

                //console.log(JSON.stringify(layers));
                
                //vis type
                console.log('about to call area.');
                /*
                var area = d3.svg.area()
                    .interpolate('cardinal')
                    .x(function (d, i) {
                        return x(d.x);
                    })
                    .y0(function (d) {
                        return y(d.y0);
                    })
                    .y1(function (d) {
                        return y(d.y0 + d.y);
                    });
                */
                /*
                var area = d3.svg.area()
                    .interpolate('basis')
                    .x(function (d) {
                        return xScale(d.x);
                    })
                    .y0(function (d) {
                        console.log(d.y0);
                        console.log(yScale(d.y0));
                        return yScale(d.y0);
                    })
                    .y1(function (d) {
                        return yScale(d.y0 + d.y);
                    });
                */
                /*
                var area = d3.svg.area()
                    .interpolate('cardinal');

                area.x(function(d,i) { 
                        console.log(i);
                        return xScale(d.x);
                    });

                area.y0(function (d) {
                    console.log('d.y0:');
                    console.log(d.y0);
                    return y(d.y0);
                })
                console.log(area);

                area.y1(function (d) {
                    return y(d.y0 + d.y);
                });
                console.log(area);

                console.log('done with call to area.');
                */
                var area = d3.svg.area()
                    .interpolate(function() { 
                        console.log('returning interpolation basis');
                        return 'basis' });

                console.log(area);

                area.x(function(d)  { console.log('whatevs1'); return x(d.x); })
                    .y0(function(d) { console.log('whatevs2'); return y(d.y0); })
                    .y1(function(d) { console.log('whatevs3'); return y(d.y0 + d.y); });


                console.log('done with call to area.');

                svg.selectAll("path")
                    .data(layers)
                    .enter().append("path")
                    .attr("d", function (d) {
                        return area(d);
                    })
                    .style("fill", function (d,i) {
                        return color(i);
                    });




            }
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
            

