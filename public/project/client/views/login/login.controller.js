(function(){
    angular
        .module("NewsRoomApp")
        .controller("LoginController",LoginController);

    function LoginController($scope,$location,$rootScope, UserService)
    {
        console.log("Controller function called!");
        //$scope.hello = "hello from header controller";
        $scope.$location = $location;


        $scope.login = login;
        function login(username,password)
        {
            UserService.findUserByUsernameAndPassword(username,password,function(user){

                if(user == null)
                {
                    $scope.errorMessage = "user not found";
                }
                else
                {
                    console.log(user);
                    $rootScope.user = user;
                    $location.path('/profile');
                }

            })
        }
    }
})();
