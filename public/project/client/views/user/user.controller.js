(function(){
    angular
        .module("NewsRoomApp")
        .controller("UserController",UserController);

    function UserController($scope,$location,$rootScope)
    {
        console.log("Controller function called!");
        //$scope.hello = "hello from header controller";
        $scope.$location = $location;

        $scope.user = $rootScope.user;
        console.log($scope.user);
        $scope.userlikes = $rootScope.user.likes.slice(1, 6);
        console.log("user likes ");
        console.log($scope.userlikes);
        console.log($scope.userlikes[2]);
        console.log("********************************");
    }
})();
