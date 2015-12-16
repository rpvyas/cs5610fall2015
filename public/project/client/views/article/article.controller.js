
"use strict";
(function(){
    angular
        .module("NewsRoomApp")
        .controller("ArticleController",ArticleController);

    function ArticleController($scope,$location,$rootScope,$http)
    {
        $scope.$location = $location;

        $scope.temp=[];
        $scope.article = $rootScope.article;
        $scope.user = $rootScope.user;

        //$rootScope.$on("searchresults",function(event,results){
        //    $scope.temp = results;
        //});

    }
})();