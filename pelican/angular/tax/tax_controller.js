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
        $scope.home();
    };

    $scope.home = function() {
        myid = 'div#myContent';
        $(myid).append( $("<h1></h1>").append( $("<b></b>").text("Home") ) )
               .append( $("<p></p>").text("Use the navigation elements to the left to explore the tax dataset.") );
    };

};

