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
                    //controller: "RegisterController"
                })

                .when("/home",
                {
                    templateUrl: "views/home/home.view.html",
                })

                .when("/login",
                {
                    templateUrl: "views/login/login.view.html",
                    //controller: "LoginController"
                })

                .when("/profile",
                {
                    templateUrl: "views/profile/profile.view.html",
                    //controller: "ProfileController"
                })

                .when("/form",
                {
                    templateUrl: "views/form/form.view.html"
                })

                .when("/user/:userId/form/:formId/fields",
                {
                    templateUrl: "views/field/field.view.html",
                })

                .otherwise({
                    redirectTo: "/home"
                })









        });
})();
