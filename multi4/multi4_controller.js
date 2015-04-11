/////////////////////////
// Controller

function Ctrl1($scope,$http,$interval) {

    $scope.initialize = function() {
        $scope.myfilter1 = 0;
        $scope.myfilter2 = 0;
    };

    $scope.load_data = function() {

        d3.csv('wine.csv',function(err,dat){
            if(err){throw err;}

            var wineData = [];
            dat.forEach(function(r,j){
                r['id'] = j;
                wineData.push(r);
            });
            $scope.wineData = wineData;

            // this forces angular to check for changes in data
            $scope.$apply();

        });
    };
    $scope.load_data();
    $scope.selectedPoint = {};




    $scope.similarCombo = function() {
        $scope.myfilter1 = 2;
        $scope.myfilter2 = 3;
    }
    $scope.differentCombo = function() {
        $scope.myfilter1 = 1;
        $scope.myfilter2 = 8;
    }



    // when the user clicks the button to get a random combo,
    // do it
    $scope.getRandomInt = function(min, max) {
      var rat = Math.floor(Math.random() * (max - min + 1) + min);
      return rat;
    }

    $scope.randomCombo = function() {
        $scope.myfilter1 = $scope.getRandomInt(1,9);
        $scope.myfilter2 = $scope.getRandomInt(1,9);
    }

    $scope.setFilter1 = function(j) {
        $scope.myfilter1 = j;
    }

    $scope.setFilter2 = function(j) {
        $scope.myfilter2 = j;
    }

};
