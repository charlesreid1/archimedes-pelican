// hipster jesus api
// for some hipster ipsum
var hipster_ipsum = function(N,tagname) {
    $.getJSON('http://hipsterjesus.com/api?paras='+N+'&html=true', function(data) {
        $(tagname).html( data.text );
    });
};


/////////////////////////
// Controller

function Ctrl1($scope,$http,$interval) {

    /////////////////////
    // Load data
    // (done right away)
    //
    $scope.load_data = function() {

        d3.csv('tax-data.csv',function(err,dat){
            if(err){throw err;}

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

    $scope.load_data();


    //////////////////////////////
    // Initialize
    // (called by ng-init)
    //
    $scope.initialize = function() {
        $scope.tab_home();
    };


    //////////////////////////////
    // Get Page Element
    // (get the element where the page content will go)
    //
    $scope.get_root_elem = function() { 
        tagname = 'div#myContent';
        return $(tagname);
    };

    ////////////////////////////
    // Tab Actions
    // (construct the various pages)
    // 
    $scope.tab_home = function() { 
        var elem = $scope.get_root_elem();
        construct_home(elem);
    };

    $scope.tab_categories = function() { 
        var elem = $scope.get_root_elem();
        construct_categories(elem);
    };

    $scope.tab_singleset = function() { 
        var elem = $scope.get_root_elem();
        //construct_single(elem);
    };

    $scope.tab_sunburst = function() { 
        var elem = $scope.get_root_elem();
        //construct_sunburst(elem);
    };

    $scope.tab_end = function() { 
        var elem = $scope.get_root_elem();
        //construct_end(elem);
    };

    $scope.tab_explore = function() { 
        var elem = $scope.get_root_elem();
        //construct_explore(elem);
    };








    var n = 3;

    // when the user clicks the button to get a random combo,
    // do it
    $scope.getRandomInt = function(min, max) {
      var rat = Math.floor(Math.random() * (max - min + 1) + min);
      return rat;
    }

};

