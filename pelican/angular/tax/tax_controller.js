/////////////////////////
// Controller

function Ctrl1($scope) {

    /////////////////////
    // Load data
    // (done right away)
    //
    $scope.load_csv_data = function() {

        d3.csv('tax-data.csv',function(err,dat){

            if(err){throw err;}

            //////////////////////////////////
            // taxData: full data set
            var taxData = [];
            dat.forEach(function(r,j){
                r['id'] = j;
                taxData.push(r);
            });

            $scope.taxData = taxData;

        });
    };


    $scope.create_category_data = function() { 

        if(!$scope.taxData) { return };

        var list = [];
        list.push({
            name: 'root',
            parent: null,
            depth: 1
        });

        dat = $scope.taxData;

        // -----------------
        // create a list of tax break categories
        var categories = [];
        dat.forEach(function(d) {

            var category = d.omb_cat;
            if( categories.indexOf(category) < 0 ) {
                categories.push(category);
                list.push({
                    name: category,
                    parent: 'root',
                    depth: 2
                });
            }

        });

        // -----------------
        // create a list of tax break names
        var names = [];
        dat.forEach(function(d) { 
            var category = d.omb_cat;
            var name = d.name;
            if( names.indexOf(name) < 0 ) {
                names.push(name);
                list.push({
                    name: name,
                    parent: category,
                    depth: 3
                });
            }
        });

        // finished populating list[]

        //console.log(list.length);


        //////////////////////////////////
        // now we turn our flat lists into trees

        // -------------------
        // treeify function 
        //
        // takes a list with keys 'name' and 'parent'
        //
        function treeify(the_list,nameAttr,parentAttr,childrenAttr) {
            if(!nameAttr) nameAttr = 'name';
            if(!parentAttr) parentAttr = 'parent';
            if(!childrenAttr) childrenAttr = 'children';

            var treeList = [];

            var lookup = {};

            // create initial list
            the_list.forEach(function(obj) {
                //obj[childrenAttr] = [];
                lookup[obj[nameAttr]] = obj;
            });

            // find parents of each node, 
            // and push self-references to their children[]
            the_list.forEach(function(obj) {
                if( obj[parentAttr] != null ) {

                    // get parent
                    var pattr = obj[parentAttr]
                    var p = lookup[pattr];

                    // add ourselves to their children
                    if( !(childrenAttr in p) ) {
                        p[childrenAttr] = [];
                    }

                    var z = p[childrenAttr];
                    z.push(obj);

                } else {
                    // no parents: this is a root node
                    treeList.push(obj);
                }
            });

            return treeList[0];

        };
        var t = treeify(list);

        // now turn list into a structured tree of dictionaries
        $scope.treeified = t;

    };


    // do this first thing - doesn't need to wait for the view.
    $scope.load_csv_data();



    //////////////////////////////
    // Initialize
    // (called by ng-init)
    //
    // this needs the view to be initialized,
    // which does not happen right away, 
    // but is done when ng-init is called. 
    //
    // if we called $scope.home() from the body,
    // like with load_csv_data, 
    // there would be no view.
    $scope.initialize = function() {
        $scope.home();
    };

    $scope.home = function() {
        myid = 'div#myContent';
        $(myid).append( $("<h1></h1>").append( $("<b></b>").text("Home") ) )
               .append( $("<p></p>").text("Use the navigation elements to the left to explore the tax dataset.") );
    };

};

