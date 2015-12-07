"use strict";

//var users = require("./user.mock.json");
var q = require("q");

module.exports = function(mongoose, db)
{
    var UserSchema = require('./user.schema.js')(mongoose);
    var UserModel  = mongoose.model("ProjectUserModel", UserSchema);
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

    //function guid()
    //{
    //    function s4()
    //    {
    //        return Math.floor((1 + Math.random()) * 0x10000)
    //            .toString(16)
    //            .substring(1);
    //    }
    //    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    //        s4() + '-' + s4() + s4() + s4();
    //}

    //function Create(user)
    //{
    //    user.id = guid();
    //    users.push(user);
    //    console.log("user "+ user.username + " created");
    //    return user;
    //}


    function Create(user)
    {
        var deferred = q.defer();
        UserModel.create(user, function(err, document){
            UserModel.findById(document._id, function(err, createdUser)
            {
                console.log("user "+ createdUser.username + " created");
                console.log(createdUser._id);
                deferred.resolve(createdUser);
            });
        });
        return deferred.promise;
    }

    function FindAll()
    {
        var deferred = q.defer();
        UserModel.find(function(err, users) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function FindById(id){
        var deferred = q.defer();
        UserModel.findById(id, function(err, user) {
            if(err) {
                console.log(err);
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function Update(id, user){
        console.log("Inside update function*****************888888");
        var deferred = q.defer();
        console.log("id of the user to be updated is " + id);
        UserModel.findById(id, function(err, userToUpdate) {
            if(err) {

                console.log(err);
                deferred.reject(err);
            } else {
                userToUpdate.firstName = user.firstName;
                userToUpdate.lastName = user.lastName;
                userToUpdate.username = user.username;
                userToUpdate.password = user.password;
                userToUpdate.email = user.email;
                userToUpdate.save(function(err, document) {

                    deferred.resolve(document);
                });

            }
        });
        return deferred.promise;
    }

    function Delete(id){
        var deferred = q.defer();
        UserModel.remove({_id:id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function FindUserByUsername(username) {
        var deferred = q.defer();
        UserModel.findOne({username: username}, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function FindUserByCredentials(credentials) {
        var deferred = q.defer();
        UserModel.findOne({username: credentials.username, password: credentials.password}, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }
    //function FindById(id)
    //{
    //    for(var i = 0; i<users.length; i++)
    //    {
    //        if(id == users[i].id)
    //        {
    //            return users[i];
    //        }
    //    }
    //}
    //
    //function Update(id, user)
    //{
    //    for(var i = 0; i<users.length; i++)
    //    {
    //        if(id == users[i].id)
    //        {
    //            users[i] = user;
    //            return users[i];
    //        }
    //    }
    //    return null;
    //}
    //
    //function Delete(id)
    //{
    //    for(var i = 0; i<users.length; i++)
    //    {
    //        if (id == users[i].id)
    //        {
    //            users.splice(i, 1);
    //        }
    //    }
    //    return users;
    //}
    //
    //function FindUserByCredentials(userCredentials)
    //{
    //    var username = userCredentials.username;
    //    var password = userCredentials.password;
    //    for(var i = 0; i<users.length; i++)
    //    {
    //        if(username === users[i].username && password === users[i].password)
    //        {
    //            return users[i];
    //        }
    //    }
    //    console.log(" user "+ username + " not found");
    //    return null;
    //}
    //
    //function FindUserByUsername(username)
    //{
    //    for(var i = 0; i<users.length; i++)
    //    {
    //        if(username === users[i].username)
    //        {
    //            return users[i];
    //        }
    //    }
    //    return null;
    //}
};