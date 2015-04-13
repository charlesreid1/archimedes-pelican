var dir_helloworld = mod.directive("helloworld", function(){
    return {
        restrict: "E",
        template: "<p><b>Hello cruel angular world! This is <code>helloworld</code> talking.</b></p>"
    }
});

var myid = 'myContent';

var ngd1 = mod.directive("intro", function($compile){
    return function(scope, element, attrs){
        element.bind("click", function(){
            $(myid).empty();
            $(myid).append($compile(
                    "<div><h1>Hello world</h1><p>Welcome to the intro populated by a directive.</p><helloworld></helloworld></div>"
            )(scope));
        });
    };
});

var ngd2 = mod.directive("categories", function($compile){
    return function(scope, element, attrs){
        element.bind("click", function(){
            angular.element($(myid)).empty();
            angular.element($(myid)).append( $compile( '<div><h1><b>Tax Break Categories</b></h1><taxcategories dummy="dummy" taxData="taxData" taxCategories="taxCategories"></taxcategories></div>' )(scope) );
        });
    };
});

var ngd3 = mod.directive("singleset", function($compile){
    return function(scope, element, attrs){
        element.bind("click", function(){
            $(myid).empty();
            $(myid).append($compile(
                    "<div><h1>Hello world</h1><p>Now single category page has been populated from a directive.</p><helloworld></helloworld></div>"
            )(scope));
        });
    };
});

var ngd4 = mod.directive("sunburst", function($compile){
    return function(scope, element, attrs){
        element.bind("click", function(){
            $(myid).empty();
            $(myid).append($compile(
                    "<div><h1>Hello world</h1><p>Now every category page has been populated from a directive.</p><helloworld></helloworld></div>"
            )(scope));
        });
    };
});

var ngd5 = mod.directive("end", function($compile){
    return function(scope, element, attrs){
        element.bind("click", function(){
            $(myid).empty();
            $(myid).append($compile(
                    "<div><h1>Hello world</h1><p>Now end page has been populated from a directive.</p><helloworld></helloworld></div>"
            )(scope));
        });
    };
});

var ngd6 = mod.directive("explore", function($compile){
    return function(scope, element, attrs){
        element.bind("click", function(){
            $(myid).empty();
            $(myid).append($compile(
                    '<div><h1>Hello world</h1><p>Now explore page has been populated from a directive.</p><helloworld></helloworld></div>'
            )(scope));
        });
    };
});





/////////////////////////
// Directive <taxcategories>

var dir2 = mod.directive('taxcategories', function() {

    function link(scope, element, attr) {

        // not sure why taxData is only available 
        // to the scope's parent, and not to the scope...
        // whatevs.

        var el = element[0];

        if(!scope.$parent.taxData) {

            $(el).empty();
            $(el).append("<p>Directive <code>mydirective</code> is loading data...");

            var watch_target = function() { 
                return scope.$parent.taxData; 
            };

            var watch_callback = function() { 
                if(scope.$parent.taxData) {
                    update(); 
                }
            };

            scope.$watch(watch_target, watch_callback);
        } else {

            update();

        };

        function update() {
            $(el).empty();
            $(el).append("<p>this is sketchy.</p>");
        };



        /*

        data = scope.data;

        var margin = {
            top: 10, 
            right: 200, 
            bottom: 10, 
            left: 100
        };
        var width = 700 - margin.right - margin.left,
            height = 800 - margin.top - margin.bottom;
                   
        var i = 0,
            duration = 750,
            root;

        var tree = d3.layout.tree()
                .size([height, width]);
                   
        var diagonal = d3.svg.diagonal()
            .projection(function(d) { return [d.y, d.x]; });
                   
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
                   
            //// Normalize for fixed-depth.
            //nodes.forEach(function(d) { d.y = d.depth * 180; });
                   
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
        */
                   
        /*
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
        */
    }

    return {
        link: link,
        restrict: 'E',
        scope: { 
            dummy: '=',
            taxData: '=',
            taxCategories: '='
        }
    }
});

