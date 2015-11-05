(function(){
    angular
        .module("NewsRoomApp")
        .controller("TimelineController",TimelineController);

    function TimelineController($scope,$location,$rootScope, NewsItemService)
    {
        console.log("Timeline controller function called!");
        //$scope.hello = "hello from header controller";
        $scope.$location = $location;

        NewsItemService.getAllNewsItems(function(items){
           $scope.newsitems = items;

        });

    }
})();
