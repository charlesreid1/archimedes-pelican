//////////////////////////////////////
// Tax Directives: Categories
//
// This file contains Angular directives
// for constructing the categories page 
// and categories chart.
// 

var categories_title_dir = mod.directive('categoriesTitle', function($compile) {
    function link(scope, element, attr) {
        var el = "div#myContent";

        $(el).empty();

        var h1 = $("<h1 />").appendTo(el);
        var b = $("<b />").text("Tax Break Categories List")
                .appendTo(h1);
    }
    return {
        restrict: "E",
        link: link,
        scope: {}
    }
});

var categories_lead_dir = mod.directive('categoriesLead', function($compile) {
    function link(scope, element, attr) {
        var el = "div#myContent";

        var p = $("<p />", {
            "class" : "lead"
        })
        .text("This is the tax categories page")
        .appendTo(el);
    }
    return {
        restrict: "E",
        link: link,
        scope: {}
    }
});


// ------------------------
// Directive:
// <taxcategories treeified='treeified'>
// 
// Constructs a naive dendrogram (tree) chart.
// This uses two widths, 
// one to determine tree node locations (small width),
// the other to draw everything (large width).
// This prevents overflow of text.

var tax_categories_dir = mod.directive('taxcategories', function() {

    function link(scope, element, attr) {

        var watch_target = function() { 
            return scope.$parent.treeified; 
        };

        var watch_callback = function() { 
            if(scope.$parent.treeified) {
                $('p#loading').remove();
                construct();
            }
        };


        var el = "div#myContent";

        var txt;
        if(!scope.$parent.treeified) {

            txt = $("<p />", { 
                "class": "lead",
                id : "loading",
                "html" : "Directive <code>mydirective</code> is loading data..."
            }).appendTo(el);

            scope.$watch(watch_target, watch_callback);

        } else {

            watch_callback();

        };

        function construct() { 

            data = scope.$parent.treeified;

            $(el).empty();

            var h1 = $("<h1 />").appendTo(el);
            var b = $("<b />").text("Tax Break Category List")
                    .appendTo(h1);



            var margin = {
                top: 10, 
                right: 100, 
                bottom: 10, 
                left: 100
            };
            
            var treewidth = 550 - margin.right - margin.left,
                treeheight = 800 - margin.top - margin.bottom;

            var width = 1200 - margin.right - margin.left,
                height = 800 - margin.top - margin.bottom;

            var i = 0,
                duration = 550,
                root;

            var tree = d3.layout.tree()
                    .size([treeheight, treewidth]);
                       
            // --------------------------------------
            // classic (naive) dendrogram
            var diagonal = d3.svg.diagonal()
                .projection(function(d) { 
                    return [d.y, d.x]; 
                });
                       
            var el = element[0];
            var svg = d3.select(el).append('svg')
                    .attr("width", width + margin.right + margin.left)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            root = data;
            root.x0 = height / 2;
            root.y0 = 0;

            function collapse(d) {
                if (d.children) {
                    d._children = d.children;
                    d._children.forEach(collapse);
                    d.children = null;
                }
            }
                       
            root.children.forEach(collapse);
            update(root);

            d3.select(self.frameElement).style("height", height + "px");
                       
            function update(source) {

                // Compute the new tree layout.
                var nodes = tree.nodes(root).reverse(),
                    links = tree.links(nodes);

                // Update the nodes…
                var node = svg.selectAll("g.node")
                    .data(nodes, function(d) { 
                        return d.id || (d.id = ++i); 
                    });

                // Enter any new nodes at the parent's previous position.
                var nodeEnter = node.enter().append("g")
                    .attr("class", "node")
                    .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
                    .on("click", click);
                       
                nodeEnter.append("circle")
                    .attr("r", 1e-6)
                    .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
                       
                nodeEnter.append("text")
                    .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
                    .attr("dy", ".35em")
                    .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
                    .text(function(d) { return d.name; })
                    .style("fill-opacity", 1e-6);
                       
                // Transition nodes to their new position.
                var nodeUpdate = node.transition()
                    .duration(duration)
                    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

                nodeUpdate.select("circle")
                    .attr("r", 4.5)
                    .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
                       
                nodeUpdate.select("text")
                    .style("fill-opacity", 1);
                       
                // Transition exiting nodes to the parent's new position.
                var nodeExit = node.exit().transition()
                    .duration(duration)
                    .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
                    .remove();
                       
                nodeExit.select("circle")
                    .attr("r", 1e-6);
                       
                nodeExit.select("text")
                    .style("fill-opacity", 1e-6);
                       
                // Update the links…
                var link = svg.selectAll("path.link")
                    .data(links, function(d) { return d.target.id; });
                
                // Enter any new links at the parent's previous position.
                link.enter().insert("path", "g")
                    .attr("class", "link")
                    .attr("d", function(d) {
                        var o = {x: source.x0, y: source.y0};
                        return diagonal({source: o, target: o});
                    });
                
                // Transition links to their new position.
                link.transition()
                    .duration(duration)
                    .attr("d", diagonal);
                
                // Transition exiting nodes to the parent's new position.
                link.exit().transition()
                    .duration(duration)
                    .attr("d", function(d) {
                        var o = {x: source.x, y: source.y};
                        return diagonal({source: o, target: o});
                    })
                    .remove();
                       
                // Stash the old positions for transition.
                nodes.forEach(function(d) {
                    d.x0 = d.x;
                    d.y0 = d.y;
                });

            }

            // Toggle children on click.
            function click(d) {
                if (d.children) {
                    d._children = d.children;
                    d.children = null;
                } else {
                    d.children = d._children;
                    d._children = null;
                }
                update(d);
            }

        };

    };

    return {
        restrict: "E",
        link: link,
        scope: {
            treeified: '='
        }
    };

});


