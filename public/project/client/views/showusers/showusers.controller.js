"use strict";
(function(){
    angular
        .module("NewsRoomApp")
        .controller("ShowUsersController",ShowUsersController);

    function ShowUsersController($scope,$location,$rootScope,$http,UserService)
    {
        $scope.$location = $location;

        $scope.temp=[];
        $scope.article = $rootScope.article;
        console.log(" logging ");
        console.log($rootScope.users);
        $scope.users = $rootScope.showusers;



    }
})();