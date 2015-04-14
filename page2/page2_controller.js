// hipster jesus api
// for some hipster ipsum
var hipster_ipsum = function(N,tagname) {
    $.getJSON('http://hipsterjesus.com/api?paras='+N+'&html=true', function(data) {
        $(tagname).html( data.text );
    });
};


/////////////////////////
// Controller

function Ctrl1($scope) {
    
    $scope.initialize = function() {
        $scope.count = 0;
    };

};
