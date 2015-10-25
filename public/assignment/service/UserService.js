(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        var users = [

        ];


        //
        var service = {
            getAllCourses: getAllCourses
        };
        return service;

        function createUser(user,callback)
        {
            users.push(user)
                .success(callback);
        }

        function deleteUserById(id,callback)
        {
            var user = users.findOne({id:id});
            var index = users.indexOf(user);
            users.splice(index, 1)
                .success(callback);
        }

        function updateUser(id,user,callback)
        {


        }

        function findUserByUsernameAndPassword(username,password,callback)
        {
            users.findOne({username:username, password:password})
            .success(callback);

        }

        function findAllCourses(callback) {
            return courses
                .success(callback);
        }
    }
})();