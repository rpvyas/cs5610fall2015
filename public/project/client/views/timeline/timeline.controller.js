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
        $scope.unFollow = unFollow;
        var userId = $routeParams.userId;
        $scope.userId = userId;

        var loggedInUser = $rootScope.user;
        if(loggedInUser._id == userId)
        {
            $scope.ownTimeline = "true";
        }
        UserService.findUserById(userId)
            .then(function(user){
                $scope.newsitems = user.sharednewsitems.reverse();
                if($scope.newsitems.length == 0)
                {
                    $scope.message = "Nothing shared so far";
                }
                $scope.followersIds = user.followers;
                $scope.followingIds = user.following;
                setCommonProperties($scope.followersIds,$scope.followingIds);
                $scope.user = user;
                $scope.favnewsitems = user.favorites;
                $scope.interests = user.interests;
                setFollowButton(loggedInUser,user);

            });

        $rootScope.$on("followEvent",function(event,followedUser){
            if(userId == followedUser._id)
            {
                $scope.showUnfollowButton = "true";
                if(followedUser._id == $scope.user._id)
                {
                    $scope.user = followedUser;
                    setCommonProperties($scope.user.followers,$scope.user.following);
                }
                else{
                    setCommonProperties($scope.user.followers,$scope.user.following);
                }


            }
        });

        function setFollowButton(loggedInUser,user)
        {
            //$rootScope.$on("followUpdated",function(event,updatedUser){
            //   loggedInUser = updatedUser;
            //});
            //if(loggedInUser._id != userId && (!alreadyFollows(loggedInUser,userId)))
            //{
            //    $scope.showFollowButton = "true";
            //}
            if(alreadyFollows(loggedInUser,userId))
            {
                $scope.showUnfollowButton = "true";
            }
        }
        function unFollow(userId)
        {
            var following = loggedInUser.following;
            for(var i=0; i<following.length;i++)
            {
                if(following[i] == userId)
                {
                    following.splice(i,1);
                }
            }
            UserService.updateUser(loggedInUser,loggedInUser._id)
                .then(function(updatedUser){
                    $scope.showUnfollowButton = "false";
                    $rootScope.$broadcast("unfollowEvent",updatedUser);

                    var unfollowedUser = $scope.user;

                    for(var j=0; j<unfollowedUser.followers.length;j++)
                    {
                        if(unfollowedUser.followers[j] == updatedUser._id)
                        {
                            unfollowedUser.followers.splice(j,1);
                            UserService.updateUser(unfollowedUser,unfollowedUser._id)
                                .then(function(updatedUnfollowedUser){
                                    $scope.followersIds = updatedUnfollowedUser.followersIds;
                                    setCommonProperties($scope.followersIds,$scope.followingIds);
                                });
                        }
                    }


                });

        }

        //function follow(userId)
        //{
        //    console.log("***FLLOW USER CALLED****");
        //    console.log(userId);
        //    $rootScope.user.following.push(userId);
        //    UserService.updateUser($rootScope.user,$rootScope.user._id)
        //        .then(function(updatedUser){
        //            console.log("USER UPDATED!!! ");
        //            console.log(updatedUser);
        //            $rootScope.$broadcast("followUpdated",updatedUser);
        //            setFollowButton(updatedUser,$scope.user);
        //        });
        //
        //}
        function alreadyFollows(subjectUser,userId)
        {
            for(var i =0 ; i<subjectUser.following.length; i++)
            {
                if(subjectUser.following[i] == userId)
                {
                    return true;
                }
            }
            return false;
        }

        // var path = "/user/" + $rootScope.user._id + "/form/" + formId + "/fields";


        function setCommonProperties(followersIds,followingIds)
        {
            if(followersIds.length !=0)
            {
                for(var i=0; i<followersIds.length; i++)
                {
                    var userId = followersIds[i];
                    UserService.findUserById(userId)
                        .then(function(foundUser){
                            $scope.followers.push(foundUser);
                        });
                }
            }
            if(followingIds.length !=0)
            {
                for(var j=0; j<followingIds.length; j++)
                {

                    var userId = followingIds[j];
                    UserService.findUserById(userId)
                        .then(function(foundUser){

                            $scope.following.push(foundUser);
                            //console.log(" following length " + $scope.following.length);
                        });
                }
            }


            //console.log(" following length " + $scope.following.length);
        }


    }
})();
