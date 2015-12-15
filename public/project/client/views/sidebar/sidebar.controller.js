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
        setSuggestedUsers();

        function setSuggestedUsers()
        {
            console.log("inside suggested users ");
            UserService.findAllUsers()
                .then(function(allUsers){
                    console.log("all users left ");
                    console.log(allUsers);
                    for(var i=0; i<allUsers.length;i++)
                    {
                        var currentUser = allUsers[i];
                        console.log("******************");
                        console.log(currentUser);
                        console.log("******************");
                        if($scope.user._id == currentUser._id)
                        {
                            console.log("first continue ");
                            continue;
                        }

                        else
                        {
                            if(!(alreadyFollows($rootScope.user,allUsers[i])))
                            {
                                $scope.suggestedUsers.push(allUsers[i]);
                            }
                        }
                    }
                    console.log("suggested users ");
                    console.log($scope.suggestedUsers);
                    if($scope.suggestedUsers.length == 0)
                    {
                        $scope.message = "following everyone";
                    }
                });
        }

        function alreadyFollows(subjectUser, userToCheck)
        {
            console.log("%%%%%%%%%%%%%%%%INSIDE ALREADY FOLLOWS%%%%%%%%%%%%%%%%%%%%%");
            console.log(subjectUser);
            console.log(userToCheck);
            console.log("%%%%%%%%%%%%%%%% ALREADY FOLLOWS%%%%%%%%%%%%%%%%%%%%%");
            for(var i=0; i<subjectUser.following.length; i++ )
            {
                console.log(subjectUser.following[i] + "    "+ userToCheck._id);
                if(subjectUser.following[i] == userToCheck._id)
                {
                    console.log("************RETURNING TRUE******************");
                    return true;
                }
            }
            console.log("************RETURNING FALSE******************");
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
                    $scope.suggestedUsers = [];
                    console.log("calling reset function");
                    setSuggestedUsers();
                });

        }

    }



})();
