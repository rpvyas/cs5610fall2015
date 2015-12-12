"use strict";

module.exports = function(mongoose) {
    var UserSchema = mongoose.Schema({
        "firstname": String,
        "lastname": String,
        "username": String,
        "password": String,
        "email": String,
        "interests":[String],
        "sharednewsitems":{type:Array},
        "favorites":{type:Array},
        "following":[String],
        "followers":[String],

    }, {collection: "cs5610.project.user"});

    return UserSchema;
};