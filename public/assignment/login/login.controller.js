(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($scope,$location, UserService)
    {
        console.log("Controller function called!");
        //$scope.hello = "hello from header controller";
        $scope.$location = $location;
    }
})();
