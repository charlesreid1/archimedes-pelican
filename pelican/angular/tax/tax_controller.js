/////////////////////////
// Controller

function Ctrl1($scope) {

    //////////////////////////////////////
    //
    // Initialization Functions
    //
    //////////////////////////////////////

    // -------------------------
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
    //
    $scope.initialize = function() {
        $scope.myfilter = "Select a Category";
        $scope.$watch('clicked',function() {
            $scope.clicked();
        });
    };


    // -------------------------
    // Categories init function
    //
    $scope.categories_init = function() { 
        if( !$scope.taxData ) { 
            $scope.$watch('taxData',doit);
        } else {
            doit();
        }
        function doit() { 
            if(!$scope.taxData){return};
            $scope.treeified = get_category_tree($scope.taxData);
        };
    };

    // -------------------------
    // Categories explorer init funtion
    //
    $scope.categoriesexplorer_init = function() { 
        if( !$scope.taxData ) { 
            $scope.$watch('taxData',doit);
        } else {
            doit();
        }
        function doit() {
            if(!$scope.taxData){return};
            $scope.categorieslist = get_tax_categories($scope.taxData);
            $scope.taxDataCat = get_category_aggregate_data($scope.taxData);
        };
    };


    $scope.categoriesexplorerera_init = $scope.categoriesexplorer_init;


    $scope.sunburst_init = function() {
        if( !$scope.taxData ) { 
            $scope.$watch('taxData',doit);
        }else{ 
            doit();
        }
        function doit() {
            if(!$scope.taxData){return};
            $scope.treeified = $scope.get_category_tree_yr($scope.taxData,2015);
        }
    };




    //////////////////////////////////////////
    //
    // Load Data Functions
    //
    //////////////////////////////////////////




    // ------------------------
    // Load all tax data from CSV
    // (this is always done, first thing)
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

            console.log('finished loading taxData, now assigning to scope.');
            $scope.taxData = taxData;

        });
    };


    // ------------------------
    // Load all tax break categories
    //
    get_tax_categories = function(dat) { 
        var categories = [];
        dat.forEach(function(d) {
            var category = d.omb_cat;
            if( categories.indexOf(category) < 0 ) {
                categories.push(category);
            }
        });
        return categories;
    }




    // --------------------------
    // Load category tree 
    //
    $scope.get_category_tree = function(dat) { 

        var list = [];

        list.push({
            name: 'root',
            parent: null,
            depth: 0
        });

        // --------
        // create a list of tax break categories
        var categories = [];
        dat.forEach(function(d) { 
            var category = d.omb_cat;
            if( categories.indexOf(category) < 0 ) {
                categories.push(category);
                list.push({
                    name: category,
                    parent: 'root',
                    depth: 1
                });
            }
        });

        // --------
        // create a list of tax break names
        var names = [];
        dat.forEach(function(d) { 
            var category = d.omb_cat;
            var name = d.name;
            var tot = d.total
            if( names.indexOf(name) < 0 ) {
                names.push(name);
                list.push({
                    name: name,
                    parent: category,
                    depth: 2
                });
            }
        });

        return treeify(list);

    };



    // --------------------------
    // Load category tree, filtering by year
    //
    // year is a number
    //
    $scope.get_category_tree_yr = function(dat,year) { 
        var list = [];
        list.push({
            name: 'root',
            parent: null,
            depth: 0
        });

        // -------
        // filter data by year before doing anything
        dat = dat.filter(function(d) { 
            return +d.year == year;
        });

        // --------
        // create a list of tax break categories
        var categories = [];
        dat.forEach(function(d) { 
            var category = d.omb_cat;
            if( categories.indexOf(category) < 0 ) {
                categories.push(category);
                list.push({
                    name: category,
                    parent: 'root',
                    depth: 1
                });
            }
        });

        // --------
        // create a list of tax break names
        var names = [];
        dat.forEach(function(d) { 
            var category = d.omb_cat;
            var name = d.name;
            var tot = d.total
            if( names.indexOf(name) < 0 ) {
                names.push(name);
                list.push({
                    name: name,
                    parent: category,
                    total: tot,
                    depth: 2
                });
            }
        });

        return treeify(list);

    };


    // ---------------------------
    // Treeify category data
    //
    function treeify(the_list,nameAttr,parentAttr,childrenAttr) {
        if(!nameAttr) nameAttr = 'name';
        if(!parentAttr) parentAttr = 'parent';
        if(!childrenAttr) childrenAttr = 'children';

        var treeList = [];

        var lookup = {};

        // create initial list
        the_list.forEach(function(obj) {
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


    // aggregate/reduce tax break data
    // by category
    // (category explorer page)
    get_category_aggregate_data = function(dat) {
        return dat;
    };


    //////////////////////////////////////////////////
    // Constructor
    //

    // ------------------------
    // do this first thing - doesn't need to wait for the view.
    //
    $scope.load_csv_data();

};

