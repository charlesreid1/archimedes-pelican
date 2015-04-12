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

            var taxData = [];
            dat.forEach(function(r,j){
                r['id'] = j;
                taxData.push(r);
            });

            $scope.taxData = taxData;

            // this forces angular to check for changes in data
            $scope.$apply();

        });

    };

    $scope.create_category_data = function() { 

        /*
        $scope.taxData.forEach( function(r,j) {
            console.log(j);
        });
        */


        /*
                if( categories_lvl1.indexOf(r['omb_cat']) < 0 ) {
                    categories_lvl1.push(r['omb_cat']);
                };

                if( categories_lvl2.indexOf(r['name']) < 0 ) {
                    categories_lvl2.push(r['name']);
                };

            });

        d3.json('tax-data2.json',function(err,dat) {
            $scope.data = dat;
            $scope.$apply();
        });
        */

    };

    $scope.load_csv_data();
    $scope.create_category_data();



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

