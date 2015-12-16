(function(){
    angular
        .module("NewsRoomApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($scope,$location,$rootScope, UserService)
    {

        //$scope.hello = "hello from header controller";
        $scope.$location = $location;

        $scope.user = $rootScope.user;


        $scope.update = update;
        function update(user)
        {

            UserService.updateUser(user, user._id)
                .then(function(updatedUser){
                    $scope.successMessage = "information updated";
                });
        }

    }
})();
