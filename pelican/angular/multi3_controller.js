/////////////////////////
// Controller

function Ctrl1($scope,$http,$interval) {

    /*
    $scope.initialize = function() {
        $scope.filter1 = 'all';
        $scope.filter2 = 'all';
    }
    */

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
    $scope.selectedPoint = false;
};


