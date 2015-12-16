(function() {
    angular
        .module("NewsRoomApp")
        .controller("HomeController", HomeController);

    function HomeController($scope,$location,$rootScope, $http)
    {
        //var elem = document.querySelector('.grid');
        //var msnry = new Masonry(elem, {
        //    // options
        //    itemSelector: '.grid-item',
        //    columnWidth: 200
        //});
        //var msnry = new Masonry('.grid', {
        //    // options
        //});


        $scope.search = search;

        function search(searchTerm)
        {
            //console.log("Search called!");
            //console.log(searchTerm);
        }
    }

})();