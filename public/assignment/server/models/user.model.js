"use strict";

var users = require("./user.mock.json");

module.exports = function(app)
{
    var api =
    {
        Create : Create,
        FindAll : FindAll,
        FindById : FindById,
        Update : Update,
        Delete : Delete,
        FindUserByUsername : FindUserByUsername,
        FindUserByCredentials : FindUserByCredentials
    };
    return api;

    function guid()
    {
        function s4()
        {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    function Create(user)
    {
        user.id = guid();
        users.push(user);
        console.log("user "+ user.username + " created");
        return user;
    }

    function FindAll()
    {
        return users;
    }

    function FindById(id)
    {
        for(var i = 0; i<users.length; i++)
        {
            if(id == users[i].id)
            {
                return users[i];
            }
        }
    }

    function Update(id, user)
    {
        for(var i = 0; i<users.length; i++)
        {
            if(id == users[i].id)
            {
                users[i] = user;
                return users[i];
            }
        }
        return null;
    }

    function Delete(id)
    {
        for(var i = 0; i<users.length; i++)
        {
            if (id == users[i].id)
            {
                users.splice(i, 1);
            }
        }
        return users;
    }

    function FindUserByCredentials(userCredentials)
    {
        var username = userCredentials.username;
        var password = userCredentials.password;
        for(var i = 0; i<users.length; i++)
        {
            if(username === users[i].username && password === users[i].password)
            {
                return users[i];
            }
        }
        console.log(" user "+ username + " not found");
        return null;
    }

    function FindUserByUsername(username)
    {
        for(var i = 0; i<users.length; i++)
        {
            if(username === users[i].username)
            {
                return users[i];
            }
        }
        return null;
    }
};