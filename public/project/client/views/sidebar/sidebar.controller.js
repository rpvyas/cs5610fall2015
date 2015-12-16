(function(){
    angular
        .module("NewsRoomApp")
        .controller("SidebarController",SidebarController);

    function SidebarController($scope,$location,$rootScope, UserService)
    {

        $scope.$location = $location;
        $scope.user = $rootScope.user;
        $scope.follow = follow;


        $rootScope.$on("auth", function (event, user) {
            $scope.user = $rootScope.user = user;
        });


        var user = $rootScope.user;
        $scope.suggestedUsers = [];

        setSuggestedUsers();

        $rootScope.$on("unfollowEvent",function(event,updatedUser){
            $scope.user = updatedUser;
            $rootScope.user = updatedUser;
            $scope.suggestedUsers = [];
            $scope.message="";
            setSuggestedUsers();
        });
        function setSuggestedUsers()
        {

            UserService.findAllUsers()
                .then(function(allUsers){
                    for(var i=0; i<allUsers.length;i++)
                    {
                        var currentUser = allUsers[i];

                        if($scope.user._id == currentUser._id)
                        {

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
                    if($scope.suggestedUsers.length == 0)
                    {
                        $scope.message = "following everyone";
                    }
                });
        }

        function alreadyFollows(subjectUser, userToCheck)
        {

            for(var i=0; i<subjectUser.following.length; i++ )
            {

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
                    $scope.suggestedUsers = [];

                    setSuggestedUsers();
                    //$rootScope.$broadcast("followEvent",userId);
                    $rootScope.$broadcast("followEvent",foundUser);
                });

        }

    }



})();
