/////////////////////////
// Controller

function Ctrl1($scope,$http,$interval) {

    $scope.initialize = function() {
        $scope.testvariable = "Hello cruel angular world";
    };

    /*
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
    $scope.selectedPoint = {};
    */




    // when the user clicks the button to get a random combo,
    // do it
    $scope.getRandomInt = function(min, max) {
      var rat = Math.floor(Math.random() * (max - min + 1) + min);
      return rat;
    }

    $scope.goHome = function() {
        $scope.testvariable = "goHome: the number "+$scope.getRandomInt(1,10);
    }

    $scope.go1 = function() {
        $scope.testvariable = "go1: the number "+$scope.getRandomInt(1,10);
    }

    $scope.go2 = function() {
        $scope.testvariable = "go2: the number "+$scope.getRandomInt(1,10);
    }

    $scope.go3 = function() {
        $scope.testvariable = "go3: the number "+$scope.getRandomInt(1,10);
    }

    $scope.go4 = function() {
        $scope.testvariable = "go4: the number "+$scope.getRandomInt(1,10);
    }

    $scope.go5 = function() {
        $scope.testvariable = "go5: the number "+$scope.getRandomInt(1,10);
    }

};

