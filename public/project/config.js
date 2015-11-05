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
                .when("/signup",
                {
                    templateUrl: "client/views/signup/signup.view.html",
                    controller: "SignupController"
                })

                .when("/home",
                {
                    templateUrl: "home/views/home/home.view.html",
                })

                .when("/login",
                {
                    templateUrl: "client/views/login/login.view.html",
                    controller: "LoginController"
                })


                .otherwise({
                    redirectTo: "/home"
                })









        });
})();
