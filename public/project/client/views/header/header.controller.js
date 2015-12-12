(function(){
    angular
        .module("NewsRoomApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope,$location,$rootScope,UserService)
    {
        //$scope.hello = "hello from header controller";
        $scope.$location = $location;
        $scope.user = $rootScope.user;
        $scope.logout = logout;
        $scope.deleteAllUsers = deleteAllUsers;

        if($scope.user)
        {
            console.log(" USER ID = "+ $scope.user._id);
        }
        $rootScope.$on("auth", function (event, user) {
            $scope.user = $rootScope.user = user;
        });

        $scope.navigateToTimeLine = navigateToTimeLine;
        function navigateToTimeLine(userId)
        {
            console.log("^^^^^^^^^^^^^^HERE^^^^^^^^^^^^");
            var path = "/timeline/" + userId;
            console.log(" path is " + path);
            $location.path(path);
        }

        function logout()
        {
            $scope.user = $rootScope.user = null;
            $location.path("/home");
        }

        function deleteAllUsers()
        {
            console.log("inside delete all users ");
            UserService.findAllUsers()
                .then(function(allUsers){
                   for(var i=0 ; i<allUsers.length; i++)
                   {
                       UserService.deleteUserById(allUsers[i]._id);
                   }
                });
            console.log("users deleted");
        }
    }
})();
