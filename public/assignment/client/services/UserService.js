(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http,$q)
    {    //
        var service = {
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserByUsernameAndPassword:findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,

        };
        return service;

        function createUser(user)
        {
            var defer = $q.defer();
            var url = '/api/assignment/user';
            $http.post(url, user)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
            
        }

        function deleteUserById(id)
        {
            var defer = $q.defer();
            var url = '/api/assignment/user/'+ userId;
            console.log(url);
            $http.delete(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function updateUser(id,user)
        {
            var defer = $q.defer();
            var url = '/api/assignment/user/'+ userId;
            console.log(url);
            $http.put(url, user)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function findUserByUsernameAndPassword(username,password)
        {
            var defer = $q.defer();
            var url = "/api/assignment/user?username=" + username + "&password=" + password;
            console.log(url);
            $http.get(url)
                .success(function(response)
                {
                    defer.resolve(response);
                });
            return defer.promise;
        }



        function findAllUsers()
        {
            var defer = $q.defer();
            var url = '/api/assignment/user';
            $http.get(url)
                .success(function(response)
                {
                    defer.resolve(response);
                });
            return defer.promise;
        }
    }
})();