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
            console.log("inside register function");
            console.log("username "+ user.username );


            UserService.updateUser(user.id,user,function(user){

                if(typeof user == 'string')
                {
                    $scope.successMessage = "user not found";
                }
                else
                {
                    console.log("inside update user call back");
                    console.log(user);
                    $scope.successMessage = "profile updated!!! ";
                }

            })
        }

    }
})();
