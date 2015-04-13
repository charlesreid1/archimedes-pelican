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

            //dat.forEach(function(d){
            //    console.log(d.omb_cat);
            //});


            //////////////////////////////////
            // taxData: full data set
            var taxData = [];
            dat.forEach(function(r,j){
                r['id'] = j;
                taxData.push(r);
            });

            $scope.taxData = taxData;


            //////////////////////////////////
            // taxCategories: full data set

            // this forces angular to check for changes in data
            $scope.$apply();

            //console.log('finished loading csv data.');

        });

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

