(function(){
    angular
        .module("NewsRoomApp")
        .controller("SidebarController",SidebarController);

    function SidebarController($scope,$location,$rootScope, UserService)
    {
        console.log("Sidebar Controller function called!");
        $scope.$location = $location;
        $scope.user = $rootScope.user;
        $scope.follow = follow;


        $rootScope.$on("auth", function (event, user) {
            $scope.user = $rootScope.user = user;
        });


        var user = $rootScope.user;
        $scope.suggestedUsers = [];
        console.log("here before function");
        UserService.findAllUsers()
            .then(function(allUsers){
                console.log("all users left ");
                console.log(allUsers);
                for(var i=0; i<allUsers.length;i++)
                {
                    var currentUser = allUsers[i];
                    if($scope.user._id == currentUser._id)
                    {
                        console.log("first continue ");
                        continue;
                    }

                    else
                    {
                        var userFollowing = $rootScope.user.following;
                        for(var j=0; j<userFollowing.length; j++)
                        {
                            if((userFollowing[j] == (allUsers[i]._id)))
                            {
                                console.log(userFollowing[j] + " is equal to " + allUsers[i]._id);
                                continue;
                            }
                            else
                            {

                            }
                        }
                        //var subjectUser = $rootScope.user;
                        //var userToCheck = allUsers[i];
                        //for(var i=0; i<subjectUser.following; i++ )
                        //{
                        //    console.log(subjectUser.following[i] + "    "+ userToCheck._id);
                        //    if(!(subjectUser.following[i] == userToCheck._id))
                        //    {
                        //        $scope.suggestedUsers.push(userToCheck);
                        //    }
                        //}
                        //$scope.suggestedUsers.push(allUsers[i]);
                    }
                }
                console.log("suggested users ");
                console.log($scope.suggestedUsers);
            });

        function alreadyFollows(subjectUser, userToCheck)
        {
            for(var i=0; i<subjectUser.following; i++ )
            {
                console.log(subjectUser.following[i] + "    "+ userToCheck._id);
                if(subjectUser.following[i] == userToCheck._id)
                {
                    return true;
                }
            }
            return false;

        }
        function follow(userId)
        {
            $scope.user.following.push(userId)
            UserService.updateUser($scope.user, $scope.user._id);

            UserService.findUserById(userId)
                .then(function(foundUser){
                   foundUser.followers.push($scope.user._id);
                    UserService.updateUser(foundUser,foundUser._id);
                });

        }

    }



})();
