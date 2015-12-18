
"use strict";
(function(){
    angular
        .module("NewsRoomApp")
        .controller("ArticleController",ArticleController);

    function ArticleController($scope,$location,$rootScope,$http,UserService)
    {
        $scope.$location = $location;

        $scope.temp=[];
        $scope.article = $rootScope.article;
        $scope.user = $rootScope.user;

        $scope.favoriters = [];
        $scope.sharers = [];
        $scope.showUsers = showUsers;
        UserService.findAllUsers()
            .then(function(allUsers){
                for(var i=0;i<allUsers.length; i++)
                {
                    var currentUser = allUsers[i];
                    if(articleInFavorites(currentUser,$scope.article.title))
                    {
                        $scope.favoriters.push(currentUser);
                    }
                    if(articleInShared(currentUser,$scope.article.title))
                    {
                        $scope.sharers.push(currentUser);
                    }

                }
                //console.log($scope.favoriters);
                //console.log("*********************");
                //console.log($scope.sharers)
            });


        function articleInFavorites(user,title)
        {
            for(var i=0; i<user.favorites.length; i++)
            {
                if(user._id == $scope.user._id)
                {
                    continue;
                }
                if(user.favorites[i].title == title)
                {
                    console.log("here");
                    return true;
                }
            }
            return false;
        }

        function articleInShared(user,title)
        {
            for(var i=0; i<user.sharednewsitems.length; i++)
            {
                if(user._id == $scope.user._id)
                {
                    continue;
                }
                if(user.sharednewsitems[i].title == title)
                {

                    return true;
                }
            }
            return false;
        }
        function showUsers(users)
        {
            $rootScope.showusers = users;
            //console.log(users);
            $location.path("/showusers");
        }
        //$rootScope.$on("searchresults",function(event,results){
        //    $scope.temp = results;
        //});

    }
})();