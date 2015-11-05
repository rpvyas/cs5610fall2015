(function(){
    angular
        .module("NewsRoomApp")
        .controller("SearchController",SearchController);

    function SearchController($scope,$location,$rootScope)
    {
        console.log("Search Controller function called!");
        //$scope.hello = "hello from header controller";
        $scope.$location = $location;


        $scope.search = search;
        function search(SearchTitle)
        {
            console.log("search funtion called");
        }
    }
})();
