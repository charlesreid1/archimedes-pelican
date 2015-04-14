
/////////////////////////
// Directive <category1picker>

var cdir1 = mod.directive("category1picker", function($compile) { 
    function link(scope, element, attr) {

        var el = "div#category1";

        var p = $("<p />", {
            "class" : "lead"
        }).text("Select first category:")
        .appendTo(el);


        // construct button group,
        // then compile html with angular,
        // then add to document

        var btn_group = $("<div />", {
            "class" : "btn-group"
        });

        var btn = $("<button />", {
            type : "button",
            "class" : "btn btn-success dropdown-toggle",
            "data-toggle" : "dropdown",
            "aria-expanded" : "false",
            "html" : 'Category <span class="caret"></span>'
        }).appendTo(btn_group);

        var ul = $("<ul />", {
            "class" : "dropdown-menu",
            role: "menu"
        }).appendTo(btn_group);

        var divider = $("<li />", {
            "class" : "divider"
        }).appendTo(ul);

        for (var i = 1; i <= 9; i++) {
            var li = $("<li />", {}).appendTo(ul);
            var a = $("<a />", {
                "id" : i,
                cat : ""
            }).text("Category "+i).appendTo(li);
        };

        var bg = $compile(btn_group.html())(scope);
        angular.element($(el)).append(bg);

    };

    return {
        restrict: "E",
        link: link,
        scope: {
            myfilter1 : '='
        }
    }
});


var cdir = mod.directive("cat", function($compile) { 
    console.log('reached cat directive');
    return function(scope, element, attrs){
        element.bind("click", function(){
            var id = +attrs.id;
            scope.myfilter1 = id;
            scope.$apply();
        });
    };
});




// // // var cat1_dir = mod.directive('cat1', function($compile) {
// // //     return function(scope, element, attrs){
// // //         element.bind("click", function(){
// // //             console.log('in cat1 directive.');
// // //             console.log(scope);
// // //             scope.myfilter1 = 1;
// // //             //angular.element(document.getElementById('go1')).empty();
// // //             //angular.element(document.getElementById('go1')).append($compile("<div><h1>Hello world</h1><p>Now page 1 has been populated from
// // //         });
// // //     };
// // //     /*
// // //     function link(scope, element, attr) {
// // //     };
// // //     return {
// // //         link: link,
// // //         restrict: 'E',
// // //         scope: { 
// // //             myfilter1 : '='
// // //         }
// // //     }
// // //     */
// // // });


/////////////////////////
// Directive <wine>

var dir = mod.directive('wine', function() {

    function link(scope, element, attr) {

        scope.xlabel = attr.xlabel;
        scope.ylabel = attr.ylabel;



        ///////////////////////
        // here, we have to create a linear array, 1..9
        // then we set that as the domain of the color scale.
        // otherwise, colors will be assigned on a first-come-first-serve basis.
        //
        // also, we should be using coffeescript...
        // then we could just say
        // 1..9
        //
        var list = [];
        for (var i = 1; i <= 9; i++) {
                list.push(i);
        }
        var color = d3.scale.category10().domain(list);

        var el = element[0];
        var svg = d3.select(el).append('svg').attr('class','scatter');

        var w = 400;
        var h = 400;
        svg.attr({width: w, height: h});

        var xAxisG = svg.append('g').attr('class', 'x-axis');
        var yAxisG = svg.append('g').attr('class', 'y-axis');
        var points = svg.append('g').attr('class', 'points').selectAll('g.point');
        var x = d3.scale.linear();
        var y = d3.scale.linear();

        var m = 50;
        x.range([m, w - m]);
        y.range([h - m, m]);

        // axis

        var xAxis = d3.svg.axis().scale(x).orient('bottom').ticks(5);
        var yAxis = d3.svg.axis().scale(y).orient('left').ticks(5);

        xAxisG.attr('transform', 'translate(' + [0, y.range()[0] + 0.5] + ')');
        yAxisG.attr('transform', 'translate(' + [x.range()[0], 0] + ')');
        update();

        // x axis label

        var xloc = w - (w/2);
        var yloc = h - (m/10);
        svg.append("text")
            .attr("class", "axislabel")
            .attr("id", "xaxislabel")
            .attr("text-anchor", "middle")
            .attr("x",xloc)
            .attr("y",yloc)
            .text(scope.xlabel);

        // y axis label

        var xloc = 0 - (h/2);
        var yloc = -(m/10);
        svg.append("text")
            .attr("class", "axislabel")
            .attr("id", "yaxislabel")
            .attr("text-anchor", "middle")
            .attr("x",xloc)
            .attr("y",yloc)
            .attr("dy","1em")
            .attr("transform","rotate(-90)")
            .text(scope.ylabel);


        scope.$watch('filter1', update);
        scope.$watch('filter2', update);
        scope.$watch('data', update);

        function update(){
            if(!scope.data){ 
                return 
            };

            //console.log('==================');
            //console.log('UPDATE()');

            var data = scope.data;

            // NOTE: the +d notation forces D3 to return the data
            // as a float. This is because D3 treats integers as strings
            // by default.
            var x_min = d3.min(data,function(d){return +d[scope.xlabel];});
            var x_max = d3.max(data,function(d){return +d[scope.xlabel];});
            x.domain([x_min,x_max]);

            var y_min = d3.min(data,function(d){return +d[scope.ylabel];});
            var y_max = d3.max(data,function(d){return +d[scope.ylabel];});
            y.domain([y_min,y_max]);

            // --------------------------
            // filter the data here

            var ix1 = +scope.filter1;
            var ix2 = +scope.filter2;

            filterfunc = function(d) {
                var condition=false;
                if (d.class==ix1) {
                    condition = true;
                }
                if (d.class==ix2) { 
                    condition = true;
                }
                return condition;
            };

            data = data.filter(filterfunc);

            points = points.data(data);

            points.exit().remove();
            var point = points.enter().append('g')
              .attr('class', 'point');
              //.attr('id',function(d) {
              //    console.log(d);
              //    return d.id;
              //});

            point.append('circle')
              .attr('r', 5)
              .attr('opacity',0.5);

              //.attr('id', function(d) {
              //  var did = d.id;
              //  return did; 
              //});

            // using attr(fill) instead of style(fill) 
            // allows active class to take precedence

            // update the position and fill of all the points

            svg.selectAll('g.point')
              .attr('transform', function(d){
                return 'translate(' + [x( d[scope.xlabel] ), y(d[scope.ylabel])] + ')';
              })
              .attr('id', function(d) {
                return d.id; 
              })
              .attr('fill', function(d) { 
                var rat = color( +d.class );
                return rat;
              })
              .on('mouseover', function(d){
                  scope.$apply(function(){
                    scope.selectedPoint = d;
                  });
                  d3.selectAll('g.point').classed('active',function(e){
                      var did = +d['id'];
                      var eid = e['id'];
                      return did==eid;
                  });
              })
              .on('mouseout', function(){
                  /*
                  scope.$apply(function(){
                      scope.selectedPoint = {};
                  });
                  */
                  d3.selectAll('g.point').classed('active',false);
              });


            xAxisG.call(xAxis);
            yAxisG.call(yAxis);

        };

    }

    return {
        link: link,
        restrict: 'E',
        scope: { 
            data: '=',
            filter1: '=',
            filter2: '=',
            selectedPoint: '=',
            xlabel: '=',
            ylabel: '='
        }
    }
});

var c = mod.controller("Ctrl1", ["$scope","$http","$interval",Ctrl1]);

