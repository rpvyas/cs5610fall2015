(function(){
    angular
        .module("NewsRoomApp")
        .controller("TimelineController",TimelineController);

    function TimelineController($scope,$location,$rootScope,UserService,$routeParams)
    {
        //$scope.hello = "hello from header controller";
        $scope.$location = $location;
        $scope.followingIds = [];
        $scope.followersIds = [];
        $scope.following = [];
        $scope.followers = [];
        var userId = $routeParams.userId;
        $scope.userId = userId;
        console.log(" inside timeline controller id is "+ userId);
        UserService.findUserById(userId)
            .then(function(user){
                $scope.newsitems = user.sharednewsitems.reverse();
                $scope.followersIds = user.followers;
                $scope.followingIds = user.following;
                setCommonProperties($scope.followersIds,$scope.followingIds);
                $scope.user = user;
                console.log("length of following "+ $scope.followingIds.length);
                //console.log("length of user following "+ user.followersIds.length);
                console.log(user);

            });

        // var path = "/user/" + $rootScope.user._id + "/form/" + formId + "/fields";

        var loggedInUser = $rootScope.user;
        function setCommonProperties(followersIds,followingIds)
        {
            for(var i=0; i<followersIds.length; i++)
            {
                var userId = followersIds[i];
                UserService.findUserById(userId)
                    .then(function(foundUser){
                        $scope.followers.push(foundUser);
                    });
            }
            console.log(followingIds);
            for(var j=0; j<followingIds.length; j++)
            {
                console.log(" length "+ $scope.followingIds.length)
                var userId = followingIds[j];
                UserService.findUserById(userId)
                    .then(function(foundUser){
                        console.log("&&user found ");
                        console.log(foundUser);
                        $scope.following.push(foundUser);
                        console.log(" following length " + $scope.following.length);
                    });
            }
            //console.log(" following length " + $scope.following.length);
        }


    }
})();
