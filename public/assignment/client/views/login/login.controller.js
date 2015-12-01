(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($scope,$location,$rootScope, UserService)
    {
        console.log("Login Controller function called!");
        //$scope.hello = "hello from header controller";
        $scope.$location = $location;


        $scope.login = login;
        function login(user) {
            var username = user.username;
            var password = user.password;
            console.log(" user "+ username + " password " + password);
            UserService.findUserByUsernameAndPassword(username, password)
                .then(function(currentUser) {
                    if(currentUser != null) {
                        $rootScope.user = currentUser;
                        $location.path("/profile");
                    }
                });
        }

    }
})();
