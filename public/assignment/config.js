(function() {
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider) {
            $routeProvider
                //Root path
                .when("/", {
                    templateUrl: "courseList/courseList.view.html",
                    controller: "courseList.controller"
                })
                .when("/register",
                {
                    templateUrl: "register/register.view.html",
                    controller: "RegisterController"
                })

                .when("/home",
                {
                    templateUrl: "home/home.view.html",
                })

                .when("/login",
                {
                    templateUrl: "login/login.view.html",
                    controller: "LoginController"
                })





                .when("/profile",
                {
                    templateUrl: "register/register.view.html",
                    controller: "RegisterController"
                })
                .when("/admin",
                {
                    templateUrl: "register/register.view.html",
                    controller: "RegisterController"
                })
                .when("/forms",
                {
                    templateUrl: "register/register.view.html",
                    controller: "RegisterController"
                })






        });
})();
