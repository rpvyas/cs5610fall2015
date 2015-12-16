(function(){
    angular
        .module("NewsRoomApp")
        .controller("UserController",UserController);

    function UserController($scope,$location,$rootScope)
    {

        //$scope.hello = "hello from header controller";
        $scope.$location = $location;

        $scope.user = $rootScope.user;

        $scope.userlikes = $rootScope.user.likes.slice(1, 11);


    }
})();
