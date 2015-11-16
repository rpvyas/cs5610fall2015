(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope,$location)
    {
        console.log("Controller function called!");
        //$scope.hello = "hello from header controller";
        $scope.$location = $location;
    }
})();
