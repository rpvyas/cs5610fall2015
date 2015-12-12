(function(){
    angular
        .module("NewsRoomApp")
        .controller("SignupController",SignupController);

    function SignupController($scope,$location,$rootScope,UserService)
    {
        console.log("Signup Controller function called!");
        //$scope.hello = "hello from header controller";
        $scope.$location = $location;
        $scope.signup = signup;

        function signup(user)
        {
            console.log(user);
            console.log("inside register function");
            console.log("username "+ user.username );
            var newUser = {
                username:user.username,
                password:user.password,
                firstname:user.firstname,
                lastname:user.lastname,
                email:user.email,
                interests:[],
                sharednewsitems:[],
                favorites:[],
                following:[],
                followers:[],

            };

            UserService.createUser(newUser)
                .then(function(newlyCreatedUser) {
                    //console.log(newlyCreatedUser);

                    //update rootscope user
                    $rootScope.user = newlyCreatedUser;
                    $rootScope.$broadcast('auth', newlyCreatedUser);
                    //Navigate to profile
                    $location.path("/categories");
                });

            //console.log("current url ");
            //console.log($location.url);
            ////$rootScope.user = newUser;
            //$location.path('/categories');


        }
    }



})();
