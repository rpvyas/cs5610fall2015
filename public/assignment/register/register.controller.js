(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($scope,$location, UserService)
    {
        console.log("Controller function called!");
        //$scope.hello = "hello from header controller";
        $scope.$location = $location;
    }
})();
