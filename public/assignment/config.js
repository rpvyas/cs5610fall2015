(function() {
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider) {
            $routeProvider
                //Root path
                .when("/", {
                    templateUrl: "home/home.view.html"
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
                    templateUrl: "profile/profile.view.html",
                    controller: "ProfileController"
                })

                .when("/form",
                {
                    templateUrl: "form/form.view.html"
                })

                .otherwise({
                    redirectTo: "/home"
                })









        });
})();
