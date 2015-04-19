var ng;
dir = [];

//////////////////////////////////////
// Tax Directives: Sunburst
//
// This file contains Angular directives
// for constructing the categories explore page.
// 

ng = mod.directive('sunburstTitle', function($compile) {
    function link(scope, element, attr) {
        var el = "div#myContent";
        $(el).empty();

        var h1 = $("<h1 />")
            .appendTo(el);
        var b = $("<b />")
            .text("Tax Break Category Explorer")
            .appendTo(h1);
    }
    return {
        restrict: "E",
        link: link,
        scope: {}
    }
});
dir.push(ng);

ng = mod.directive('sunburstLead', function($compile) {
    function link(scope, element, attr) {
        var el = "div#myContent";

        var txt = $("<p />", { 
            "class": "lead" 
        })
        .text("Explore all tax breaks and tax break categories in greater detail using the sunburst chart.")
        .appendTo(el);
    }
    return {
        link: link,
        restrict: "E",
        scope : {}
    }
});
dir.push(ng);


///////////////////////////////////////////////
// Sunburst Total/Count

/*
<div class="btn-group btn-group-justified">
  <a href="#" class="btn btn-default">Left</a>
  <a href="#" class="btn btn-default">Middle</a>
  <a href="#" class="btn btn-default">Right</a>
</div>
*/

ng = mod.directive('sunburstSwitch', function($compile) {
    function link(scope, element, attr) {

        var pscope = scope.$parent;
        if( !pscope.treeified ) { 
            pscope.$watch('treeified', buildSwitch);
        } else {
            buildSwitch();
        }
        
        function buildSwitch() {
            console.log('building switch');
            var el = element[0];

            var row = $("<div />", {
                "class" : "row"
            });
            
            var btn_group = $("<div />", {
                "id" : "totalcount",
                "class" : "btn-group btn-group-justified"
            }).appendTo(row);

            var btns;

            btns = $("<a />", { 
                "id" : "total",
                "class" : "btn btn-default totalcount-btn",
                 tcfilter : ""
            }).text("Total")
            .appendTo(btn_group);

            btns = $("<a />", { 
                "id" : "count",
                "class" : "btn btn-default totalcount-btn",
                 tcfilter : ""
            }).text("Count")
            .appendTo(btn_group);

            var bg = $compile(row.html())(scope);
            angular.element($(el)).append(bg);

            //scope.$apply();

        }
    };

    return {
        link: link,
        restrict: "E",
        scope: {
            totalcount: '=',
            treeified: '='
        }
    };
});
dir.push(ng);


ng = mod.directive("tcfilter", function($compile) { 
    return function(scope, element, attrs){
        element.bind("click", function(){
            var id = attrs.id;
            console.log('click! ');
            console.log(attrs.id);
            if(id=="total") {
                scope.totalcount = function(d) { return d.total };
                scope.$apply();
            } else if(id=="count") { 
                scope.totalcount = function() { return 1 }
                scope.$apply();
            }

        });
    };
});
dir.push(ng);



///////////////////////////////////////////////
// Plain Ol Sunburst

ng = mod.directive('plainsunburst', function($compile) {

    function link(scope, element, attr) {

        var pscope = scope.$parent;
        if( !pscope.treeified ) { 
            pscope.$watch('treeified', chartCallback);
        } else {
            chartCallback();
        }

        function chartCallback() {
            //console.log(scope.treeified);
            //console.log(pscope.treeified);

            if(!pscope.treeified){ return; }

            var el = element[0];
            var br = d3.select(el).append('br');
            var h2 = d3.select(el).append('h2')
                .attr("id","titlesunburst")
                .append('b')
                .text('Tax Breaks Sunburst');

            var margin = {
                top:    10, 
                right:  40, 
                bottom: 10, 
                left:   40
            };
            
            var width   = 500 - margin.right - margin.left,
                height  = 500 - margin.top   - margin.bottom;
            
            var radius = Math.min(width, height) / 2;
            
            var x = d3.scale.linear()
                .range([0, 2 * Math.PI]);
            
            var y = d3.scale.sqrt()
                .range([0, radius]);
            
            var color = d3.scale.category20c();
            
            var svg = d3.select(el).append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");
            
            var partition = d3.layout.partition()
                .sort(null)
                .value(function(d) { return 1; });
            
            var arc = d3.svg.arc()
                .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
                .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
                .innerRadius(function(d) { return Math.max(0, y(d.y)); })
                .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });
            
            // Keep track of the node that is currently being displayed as the root.
            var node;

            node = pscope.treeified;
            var path = svg.datum(pscope.treeified).selectAll("path")
                .data(partition.nodes)
                .enter().append("path")
                .attr("d", arc)
                .style("fill", function(d) { 
                    return color((d.children ? d : d.parent).name); 
                })
                .on("click", click)
                .each(stash);

            function click(d) {
                node = d;
                path.transition()
                  .duration(1000)
                  .attrTween("d", arcTweenZoom(d));
            }

            
              //d3.selectAll("input").on("change", function change() {
              //  var value = this.value === "count"
              //      ? function() { return 1; }
              //      : function(d) { return d.size; };
            
              //  path
              //      .data(partition.value(value).nodes)
              //    .transition()
              //      .duration(1000)
              //      .attrTween("d", arcTweenData);
              //});
              //
            scope.$watch('totalcount', updateFilter);
            
            function updateFilter() { 
                path.data(partition.value(scope.totalcount).nodes)
                    .transition()
                    .duration(1000)
                    .attrTween('d',arcTweenData);
            }

            /*
            d3.selectAll("a#totalcount-btn")
                .on("change",function change() {
                    console.log('changed.');
                    var value = this.value=="count"
                        ? function() { return 1 }
                        : function(d) { return d.total };

                    path.data(partition.value(value).nodes)
                        .transition()
                        .duration(1000)
                        .attrTween('d',arcTweenData);
                });
            */

            d3.select(self.frameElement).style("height", height + "px");
            
            // Setup for switching data: stash the old values for transition.
            function stash(d) {
              d.x0 = d.x;
              d.dx0 = d.dx;
            }
            
            // When switching data: interpolate the arcs in data space.
            function arcTweenData(a, i) {
              var oi = d3.interpolate({x: a.x0, dx: a.dx0}, a);
              function tween(t) {
                var b = oi(t);
                a.x0 = b.x;
                a.dx0 = b.dx;
                return arc(b);
              }
              if (i == 0) {
               // If we are on the first arc, adjust the x domain to match the root node
               // at the current zoom level. (We only need to do this once.)
                var xd = d3.interpolate(x.domain(), [node.x, node.x + node.dx]);
                return function(t) {
                  x.domain(xd(t));
                  return tween(t);
                };
              } else {
                return tween;
              }
            }
            
            // When zooming: interpolate the scales.
            function arcTweenZoom(d) {
              var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
                  yd = d3.interpolate(y.domain(), [d.y, 1]),
                  yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
              return function(d, i) {
                return i
                    ? function(t) { return arc(d); }
                    : function(t) { 
                        x.domain(xd(t)); 
                        y.domain(yd(t)).range(yr(t)); 
                        return arc(d); };
              };
            }
        }
    };

    return {
        link: link,
        restrict: "E",
        scope: {
            totalcount: '=',
            treeified: '='
        }
    };
});
dir.push(ng);




///////////////////////////////////////////////
// Sunburst

ng = mod.directive('sunburst', function($compile) {

    function link(scope, element, attr) {

        var pscope = scope.$parent;
        if( !pscope.treeified ) { 
            pscope.$watch('treeified', chartCallback);
        } else {
            chartCallback();
        }

        function chartCallback() {
            //console.log(scope.treeified);
            //console.log(pscope.treeified);

            if(!pscope.treeified){ return; }

            var el = element[0];
            var br = d3.select(el).append('br');
            var h2 = d3.select(el).append('h2')
                .attr("id","titlesunburst")
                .append('b')
                .text('Tax Breaks Sunburst');

            var width = 600,
                height = 500,
                radius = Math.min(width, height) / 2;
            
            var x = d3.scale.linear()
                .range([0, 2 * Math.PI]);
            
            var y = d3.scale.sqrt()
                .range([0, radius]);
            
            var color = d3.scale.category20c();
            
            var svg = d3.select(el).append("svg")
                .attr("width", width)
                .attr("height", height)
              .append("g")
                .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");
            
            var partition = d3.layout.partition()
                .sort(null)
                .value(function(d) { return /*d.total*/ 1; });
            
            var arc = d3.svg.arc()
                .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
                .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
                .innerRadius(function(d) { return Math.max(0, y(d.y)); })
                .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

            // Keep track of the node that is currently being displayed as the root.
            var node;

            node = pscope.treeified;
            var path = svg.datum(pscope.treeified).selectAll("path")
                .data(partition.nodes)
                .enter().append("path")
                .attr("d", arc)
                .style("fill", function(d) { 
                    return color((d.children ? d : d.parent).name); 
                })
                .on("click", click)
                .each(stash);

            //d3.selectAll("input").on("change", function change() {

            //    var value = this.value === "count"
            //        ? function() { return 1; }
            //        : function(d) { return d.size; };
            //
            //    path.data(partition.value(value).nodes)
            //        .transition()
            //        .duration(1000)
            //        .attrTween("d", arcTweenData);

            //});
            
            function click(d) {
                console.log('click!');
                node = d;
                path.transition()
                    .duration(1000)
                    .attrTween("d", arcTweenZoom(d));
            };
    
            d3.select(self.frameElement).style("height", height + "px");
            
            // Setup for switching data: stash the old values for transition.
            function stash(d) {
                d.x0 = d.x;
                d.dx0 = d.dx;
            }
            
            //// When switching data: interpolate the arcs in data space.
            //function arcTweenData(a, i) {
            //    console.log('in arctweendata');
            //    var oi = d3.interpolate({x: a.x0, dx: a.dx0}, a);
            //    function tween(t) {
            //        var b = oi(t);
            //        a.x0 = b.x;
            //        a.dx0 = b.dx;
            //        return arc(b);
            //    }
            //    if (i == 0) {
            //     // If we are on the first arc, adjust the x domain to match the root node
            //     // at the current zoom level. (We only need to do this once.)
            //        var xd = d3.interpolate(x.domain(), [node.x, node.x + node.dx]);
            //        return function(t) {
            //            x.domain(xd(t));
            //            return tween(t);
            //        };
            //    } else {
            //        return tween;
            //    }
            //};
            
            // When zooming: interpolate the scales.
            function arcTweenZoom(d) {
                //console.log('in arctweenzoom');
                var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
                    yd = d3.interpolate(y.domain(), [d.y, 1]),
                    yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);

                return function(d, i) {
                    return i ? function(t) { return arc(d); }
                             : function(t) { 
                                x.domain(xd(t)); 
                                y.domain(yd(t)).range(yr(t)); 
                                return arc(d); };
                }
            }

        }

    };

    return {
        link: link,
        restrict: "E",
        scope: {
            treeified: '='
        }
    };
});
dir.push(ng);


