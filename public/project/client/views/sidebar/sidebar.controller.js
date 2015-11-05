(function(){
    angular
        .module("NewsRoomApp")
        .controller("SidebarController",SidebarController);

    function SidebarController($scope,$location)
    {
        console.log("Sidebar Controller function called!");
        $scope.$location = $location;
    }
})();
