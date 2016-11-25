
angular.module('DerpityApp', [])

.controller("DoSomethingController", function($scope, $http){
    $scope.start = 0;
    $scope.stop = 3;

    $scope.$watchGroup( ["start", "stop"], function(){
        $http({
            method: 'GET',
            url: '/derp/api/set_start/' + $scope.start
        });

        $http({
            method: 'GET',
            url: '/derp/api/counter/' + $scope.stop
        }).then(function(response) {
            $scope.numberList = response.data.result;
        });
    });
})

.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});
