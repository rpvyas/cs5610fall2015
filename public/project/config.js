(function() {
    angular
        .module("NewsRoomApp")
        .config(function($routeProvider) {
            $routeProvider
                //Root path
                .when("/", {
                    templateUrl: "client/views/home/home.view.html"
                })
                .when("/register",
                {
                    templateUrl: "client/views/signup/signup.view.html",
                    controller: "SignupController"
                })
                .when("/timeline",
                {
                    templateUrl: "client/views/timeline/timeline.view.html",
                    controller: "TimelineController"
                })
                .when("/search",
                {
                    templateUrl: "client/views/search/search.view.html",
                    controller: "SearchController"
                })
                .when("/user",
                {
                    templateUrl: "client/views/user/user.view.html",
                    controller: "UserController"
                })
                .when("/searchresults",
                {
                    templateUrl: "client/views/search/searchresult.view.html",
                    controller: "SearchController"
                })
                .when("/signup",
                {
                    templateUrl: "client/views/signup/signup.view.html",
                    controller: "SignupController"
                })

                .when("/home",
                {
                    templateUrl: "home/views/home/home.view.html",
                    controller:"HomeController"
                })
                .when("/select",
                {
                    templateUrl: "home/views/signup/select.html",
                    controller:"SignupController"
                })

                .when("/login",
                {
                    templateUrl: "client/views/login/login.view.html",
                    controller: "LoginController"
                })

                .when("/profile",
                {
                    templateUrl: "client/views/profile/profile.view.html",
                    controller: "ProfileController"
                })

                .when("/categories",
                {
                    templateUrl: "client/views/categories/form.view.html",
                    controller: "FormController"
                })


                .otherwise({
                    redirectTo: "/home"
                })









        });
})();
