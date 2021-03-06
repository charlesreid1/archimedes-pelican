/////////////////////////
// Controller

function Ctrl1($scope) {

    /////////////////////
    // Load data
    // (done right away)
    //
    $scope.load_data = function() {

        d3.json('tax-data2.json',function(err,dat){
            if(err){throw err;}

            $scope.data = dat;
            /*
            var taxData = [];
            dat.forEach(function(r,j){
                r['id'] = j;
                taxData.push(r);
            });
            $scope.taxData = taxData;
            */

            // this forces angular to check for changes in data
            $scope.$apply();

        });
    };

    $scope.load_data();


    //////////////////////////////
    // Initialize
    // (called by ng-init)
    //
    $scope.initialize = function() {
        //$scope.tab_home();
    };


    // // //////////////////////////////
    // // // Get Page Element
    // // // (get the element where the page content will go)
    // // //
    // // $scope.get_root_elem = function() { 
    // //     tagname = 'div#myContent';
    // //     return $(tagname);
    // // };

    // // ////////////////////////////
    // // // Tab Actions
    // // // (construct the various pages)
    // // //
    // // var elem = $scope.get_root_elem();

    // // $scope.tab_home = function() { 
    // //     construct_home(elem);
    // // };

    // // $scope.tab_categories = function() { 
    // //     construct_categories(elem);
    // // };

    // // $scope.tab_singleset = function() { 
    // //     //construct_single(elem);
    // // };

    // // $scope.tab_sunburst = function() { 
    // //     //construct_sunburst(elem);
    // // };

    // // $scope.tab_end = function() { 
    // //     //construct_end(elem);
    // // };

    // // $scope.tab_explore = function() { 
    // //     //construct_explore(elem);
    // // };
};

