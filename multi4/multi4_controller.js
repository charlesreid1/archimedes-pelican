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
    $scope.selectedPoint = false;
};
