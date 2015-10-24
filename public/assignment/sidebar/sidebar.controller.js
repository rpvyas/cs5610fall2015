(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController",SidebarController);

    function SidebarController($scope,$location)
    {
        console.log("Controller function called!");
        $scope.hello = "hello from header controller";

    }





})();
