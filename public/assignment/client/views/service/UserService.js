(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        var users = [

        ];


        //
        var service = {
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserByUsernameAndPassword:findUserByUsernameAndPassword,

        };
        return service;

        function createUser(user,callback)
        {
            //user.id = Guid.create();
            users.push(user);
            return callback(user);

            //    .success(callback(user));
            
        }

        function deleteUserById(id,callback)
        {
            var length = users.length;
            for(var i =0; i<length; i++)
            {
                if(users[i].id == id)
                {
                    users.splice(i, 1);
                    return callback(users);
                }
            }
            return callback(null);
        }

        function updateUser(id,user,callback)
        {
            var length = users.length;
            for(var i =0; i<length; i++)
            {
                if(users[i].id == id)
                {
                    users[i].username = user.username;
                    users[i].firstname = user.firstname;
                    users[i].lastname = user.lastname;
                    users[i].password = user.password;
                    users[i].email = user.email;
                    return callback(users[i]);
                }
            }
            return callback("user not found");


        }

        function findUserByUsernameAndPassword(username,password,callback)
        {
            var length = users.length;
            for(var i =0; i<length; i++)
            {
                if(users[i].username == username && users[i].password == password)
                {
                    return callback(users[i]);
                }
            }
            return callback(null);
        }

        function findAllUsers(callback)
        {
            return callback(users) ;
        }
    }
})();