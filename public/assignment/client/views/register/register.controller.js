//'use strict';
//(function(){
//    angular
//        .module("FormBuilderApp")
//        .controller("RegisterController", RegisterController);
//
//    function RegisterController($scope, $location, $rootScope, UserService) {
//        $scope.register = register;
//
//        function register() {
//            if($scope.username, $scope.password, $scope.verifyPassword, $scope.email) {
//                if ($scope.password !== $scope.verifyPassword){
//                    $scope.error = "Both the password and verify password fields should match";
//                } else {
//                    var newUser = {
//                        username: $scope.username,
//                        password: $scope.password,
//                        email: $scope.email
//                    };
//                    UserService.createUser(newUser)
//                        .then(function(newlyCreatedUser) {
//                            //console.log(newlyCreatedUser);
//
//                            //update rootscope user
//                            $rootScope.user = newlyCreatedUser;
//
//                            //Navigate to profile
//                            $location.path("/profile");
//                        });
//                }
//            }
//        }
//    }
//})();
'use strict' ;
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($scope,$location,$rootScope,UserService)
    {
        console.log("Register Controller function called!");
        //$scope.hello = "hello from header controller";
        $scope.$location = $location;
        $scope.register = register;

        function register(user)
        {
            console.log("inside register function");
            console.log("username "+ user.username );
            var newUser = {
                username:user.username,
                password:user.password,
                email:user.email
            };

            //UserService.createUser(newUser, function(user){
            //    console.log("inside create user call back");
            //
            //    console.log(user.id);
            //    console.log(user.username);
            //})

            //console.log("current url ");
            //console.log($location.url);
            //$rootScope.user = newUser;
            //$location.path('/profile');

            UserService.createUser(newUser)
                .then(function(newlyCreatedUser) {
                    //console.log(newlyCreatedUser);

                    //update rootscope user
                    $rootScope.user = newlyCreatedUser;

                    //Navigate to profile
                    $location.path("/profile");
                });
        }
    }



})();
