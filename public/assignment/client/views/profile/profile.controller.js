(function(){
    angular
        .module("FormBuilderApp")
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
            console.log("inside update function");
            console.log("username "+ user.username );

            console.log(user);
            //UserService.updateUser(user.id,user,function(user){
            //
            //    if(typeof user == 'string')
            //    {
            //        $scope.successMessage = "user not found";
            //    }
            //    else
            //    {
            //        console.log("inside update user call back");
            //        console.log(user);
            //        $scope.successMessage = "profile updated!!! ";
            //    }
            //
            //})



            UserService.updateUser(user, user._id)
                .then(function(updatedUser){
                    console.log("update user function called");
                    $scope.user = updatedUser;
                    $rootScope.user = updatedUser;
                    $scope.successMessage = "User Profile updated successfully.";
                })
                .catch(function(error){
                    $scope.error = error;
                })



        }

    }
})();
