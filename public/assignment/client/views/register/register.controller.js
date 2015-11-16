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

        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }


        function register(user)
        {
            console.log("inside register function");
            console.log("username "+ user.username );
            var newUser = {
                id: guid(),
                username:user.username,
                password:user.password,
                firstname:"",
                lastname:"",
                email:user.email
            };

            UserService.createUser(newUser, function(user){
                console.log("inside create user call back");

                console.log(user.id);
                console.log(user.username);
            })

            console.log("current url ");
            console.log($location.url);
            $rootScope.user = newUser;
            $location.path('/profile');


        }
    }



})();
