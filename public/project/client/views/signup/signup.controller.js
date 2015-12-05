(function(){
    angular
        .module("NewsRoomApp")
        .controller("SignupController",SignupController);

    function SignupController($scope,$location,$rootScope) //userservice
    {
        console.log("Signup Controller function called!");
        //$scope.hello = "hello from header controller";
        $scope.$location = $location;
        $scope.signup = signup;

        function signup(user)
        {
            console.log(user);
            //console.log("inside register function");
            //console.log("username "+ user.username );
            //var newUser = {
            //    id: guid(),
            //    username:user.username,
            //    password:user.password,
            //    firstname:"",
            //    lastname:"",
            //    email:user.email
            //};
            //
            //UserService.createUser(newUser, function(user){
            //    console.log("inside create user call back");
            //
            //    console.log(user.id);
            //    console.log(user.username);
            //})
            //
            //console.log("current url ");
            //console.log($location.url);
            //$rootScope.user = newUser;
            //$location.path('/profile');


        }
    }



})();
