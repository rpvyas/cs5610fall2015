(function(){
    angular
        .module("NewsRoomApp")
        .controller("TimelineController",TimelineController);

    function TimelineController($scope,$location,$rootScope,UserService,$routeParams)
    {
        console.log("Timeline controller function called!");
        //$scope.hello = "hello from header controller";
        $scope.$location = $location;

        var userId = $routeParams.userId;
        console.log(" inside timeline controller id is "+ userId);
        var auser = UserService.findUserById(userId)
            .then(function(user){
                $scope.newsitems = user.sharednewsitems.reverse();
            });

        console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    }
})();
