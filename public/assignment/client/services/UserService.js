"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);
    function UserService($http,$q) {

        var service = {
            findAllUsers: findAllUsers,
            findUserById: findUserById,
            findUserByUsername : findUserByUsername,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return service;

        function findUserByUsername(userName) {
            var defer = $q.defer();
            var url = "/api/assignment/user?username=" + userName;
            console.log(url);
            $http.get(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function findUserByUsernameAndPassword(userName, password) {
            var defer = $q.defer();
            var url = "/api/assignment/user?username=" + userName + "&password=" + password;
            console.log(url);
            $http.get(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function findUserById(userId) {
            var defer = $q.defer();
            var url = "/api/assignment/user/" + userId;
            console.log(url);
            $http.get(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function findAllUsers() {
            var defer = $q.defer();
            var url = '/api/assignment/user';
            $http.get(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function createUser(user)
        {
            console.log("**************MAPPED CALL TO USER SERVICE*******************")
            var defer = $q.defer();
            var url = '/api/assignment/user';
            //console.log(user);
            $http.post(url, user)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function deleteUserById(userId) {
            var defer = $q.defer();
            var url = '/api/assignment/user/'+ userId;
            console.log(url);
            $http.delete(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function updateUser(user, userId)
        {
            console.log("****************MAPPED CALL TO UPDATE USER***************");
            var defer = $q.defer();
            var url = '/api/assignment/user/'+ userId;
            console.log("**user id is "+ userId);
            $http.put(url, user)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }
    }
})();
//(function(){
//    angular
//        .module("FormBuilderApp")
//        .factory("UserService", UserService);
//
//    function UserService($http,$q)
//    {    //
//        var service = {
//            createUser: createUser,
//            deleteUserById: deleteUserById,
//            updateUser: updateUser,
//            findUserByUsernameAndPassword:findUserByUsernameAndPassword,
//            findAllUsers: findAllUsers,
//
//        };
//        return service;
//
//        function createUser(user)
//        {
//            var defer = $q.defer();
//            var url = '/api/assignment/user';
//            $http.post(url, user)
//                .success(function(response){
//                    defer.resolve(response);
//                });
//            return defer.promise;
//
//        }
//
//        function deleteUserById(id)
//        {
//            var defer = $q.defer();
//            var url = '/api/assignment/user/'+ userId;
//            console.log(url);
//            $http.delete(url)
//                .success(function(response){
//                    defer.resolve(response);
//                });
//            return defer.promise;
//        }
//
//        function updateUser(id,user)
//        {
//            var defer = $q.defer();
//            var url = '/api/assignment/user/'+ userId;
//            console.log(url);
//            $http.put(url, user)
//                .success(function(response){
//                    defer.resolve(response);
//                });
//            return defer.promise;
//        }
//
//        function findUserByUsernameAndPassword(username,password)
//        {
//            var defer = $q.defer();
//            var url = "/api/assignment/user?username=" + username + "&password=" + password;
//            console.log(url);
//            $http.get(url)
//                .success(function(response)
//                {
//                    defer.resolve(response);
//                });
//            return defer.promise;
//        }
//
//
//
//        function findAllUsers()
//        {
//            var defer = $q.defer();
//            var url = '/api/assignment/user';
//            $http.get(url)
//                .success(function(response)
//                {
//                    defer.resolve(response);
//                });
//            return defer.promise;
//        }
//    }
//})();