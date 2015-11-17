(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http,$q)
    {
        //
        var service =
        {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findFormByTitle: findFormByTitle,
            findFormById: findFormById
        };
        return service;

        function createFormForUser(userId,form)
        {
            var defer = $q.defer();
            var url = "/api/assignment/user/" + userId + "/form";
            console.log(url);
            $http.post(url, form)
                .success(function(response)
                {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function findAllFormsForUser(userId)
        {
            console.log("Inside findAllFormsForUser");
            var defer = $q.defer();
            var url = "/api/assignment/user/" + userId + "/form";
            console.log(url);
            $http.get(url)
                .success(function(response)
                {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function deleteFormById(formId)
        {
            var defer = $q.defer();
            var url = "/api/assignment/form/" + formId;
            console.log(url);
            $http.delete(url)
                .success(function(response)
                {
                    defer.resolve(response);
                });
            return defer.promise;

        }

        function updateFormById(formId,newForm)
        {
            var defer = $q.defer();
            var url = "/api/assignment/form/" + formId;
            console.log(url);
            $http.put(url,newForm).success(function(response)
            {
                defer.resolve(response);
            });
            return defer.promise;
        }

        function findFormByTitle(title)
        {
            var defer = $q.defer();
            var url = "/api/assignment/form?formTitle="+ title;
            console.log(url);
            $http.get(url)
                .success(function(response)
                {
                    defer.resolve(response);
                });
            return defer.promise;
        }


        function findFormById(formId)
        {
            var defer = $q.defer();
            var url = "/api/assignment/form/"+ formId;
            console.log(url);
            $http.get(url)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;

        }
    }
})();