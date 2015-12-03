(function(){
    angular
        .module("NewsRoomApp")
        .controller("LoginController",LoginController);

    function LoginController($scope,$location,$rootScope)
    {
        console.log("Controller function called!");
        //$scope.hello = "hello from header controller";
        $scope.$location = $location;


        $scope.login = login;

        $scope.name = "Please login";
        $scope.fbLogin = fbLogin;

        function fbLogin()
        {
            FB.login(function(response) {
                if (response.status === 'connected') {
                    console.log(response);
                    console.log("logged in ");
                    $location.path("/search")
                } else if (response.status === 'not_authorized') {
                    // The person is logged into Facebook, but not your app.
                    console.log("not authorized");
                } else {
                    // The person is not logged into Facebook, so we're not sure if
                    // they are logged into this app or not.
                    console.log("fb account doesn't exist");
                }
            });
        }

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
