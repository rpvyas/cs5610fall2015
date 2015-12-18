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
                .when("/timeline/:userId",
                {
                    templateUrl: "client/views/timeline/timeline.view.html",
                    controller: "TimelineController"
                })
                .when("/user/:userId/followers",
                {
                    templateUrl: "client/views/timeline/followers.view.html",
                    controller: "TimelineController"
                })
                .when("/user/:userId/favorites",
                {
                    templateUrl: "client/views/timeline/favorites.view.html",
                    controller: "TimelineController"
                })
                .when("/user/:userId/interests",
                {
                    templateUrl: "client/views/timeline/interests.view.html",
                    controller: "TimelineController"
                })
                .when("/user/:userId/following",
                {
                    templateUrl: "client/views/timeline/following.view.html",
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
                .when("/searchResults",
                {
                    templateUrl: "client/views/search/searchresult.view.html",
                    controller: "SearchController"
                })
                .when("/showusers",
                {
                    templateUrl: "client/views/showusers/showusers.view.html",
                    controller:"ShowUsersController"
                })
                .when("/articleview",
                {
                    templateUrl: "client/views/article/article.view.html",
                    controller: "ArticleController"
                })

                .when("/signup",
                {
                    templateUrl: "client/views/signup/signup.view.html",
                    controller: "SignupController"
                })

                .when("/home",
                {
                    templateUrl: "client/views/home/home.view.html",
                    controller:"HomeController"
                })
                .when("/select",
                {
                    templateUrl: "home/views/signup/select.html",
                    controller:"SignupController"
                })
                .when("/showarticle",
                {
                    templateUrl: "client/views/newsfeed/showarticle.view.html",
                    controller:"NewsFeedController"
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

                .when("/newsfeed",
                {
                    templateUrl: "client/views/newsfeed/newsfeed.view.html",
                    controller: "NewsFeedController"
                })


                .otherwise({
                    redirectTo: "/home"
                })









        });
})();
