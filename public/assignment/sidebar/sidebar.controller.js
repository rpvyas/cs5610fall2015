(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController",SidebarController);

    function SidebarController($scope,$location)
    {
        console.log("Sidebar Controller function called!");
        $scope.$location = $location;
    }
})();
