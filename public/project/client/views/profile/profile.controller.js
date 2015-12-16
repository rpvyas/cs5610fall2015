(function(){
    angular
        .module("NewsRoomApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($scope,$location,$rootScope, UserService)
    {
        console.log("Profile Controller function called!");
        //$scope.hello = "hello from header controller";
        $scope.$location = $location;

        $scope.user = $rootScope.user;


        $scope.update = update;
        function update(user)
        {
            console.log("update called");
            UserService.updateUser(user, user._id)
                .then(function(updatedUser){
                    $scope.successMessage = "information updated";
                });
        }

    }
})();
