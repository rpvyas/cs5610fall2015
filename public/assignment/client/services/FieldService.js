//createFieldForForm(formId, field)
//Use $http.post() to create a new field for form whose id is formId. Pass the field object as part of the post. Post to URL: /api/assignment/form/:formId/field
//getFieldsForForm(formId)
//Use $http.get() to retrieve fields belonging to a form object whose id is equal to the formId. Use URL /api/assignment/form/:formId/field
//getFieldForForm(formId, fieldId)
//Use $http.get() to retrieve a field object whose id is equal to the fieldId and belonging to a form object whose id is equal to the formId. Use URL /api/assignment/form/:formId/field/:fieldId
//deleteFieldFromForm(formId, fieldId)
//Use $http.delete() to remove a field object whose id is equal to the fieldId and belonging to a form object whose id is equal to the formId. Use URL /api/assignment/form/:formId/field/:fieldId
//updateField(formId, fieldId, field)
//Use $http.put() to update a field object whose id is equal to the fieldId and belonging to a form object whose id is equal to the formId so that its properties are the same as the property values of the field object parameter. Use URL: /api/assignment/form/:formId/field/:fieldId

"use strict";
(function ()
{
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($q, $http)
    {

        var service =
        {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField,
            cloneField : cloneField
        };
        return service;

        function createFieldForForm(formId, field)
        {
            console.log("Create field function called");
            var defer = $q.defer();
            var url = "/api/assignment/form/" + formId + "/field";
            $http.post(url, field)
                .success(function(response)
                {
                    console.log("**INSIDE SUCCESS***");
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function getFieldsForForm(formId)
        {
            var defer = $q.defer();
            var url = "/api/assignment/form/" + formId + "/field";
            $http.get(url).success(function(response)
            {
                defer.resolve(response);
            });
            return defer.promise;
        }

        function getFieldForForm(formId, fieldId)
        {
            var defer = $q.defer();
            var url = "/api/assignment/form/" + formId + "/field/" + fieldId;
            $http.get(url)
                .success(function(response)
                {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function deleteFieldFromForm(formId, fieldId)
        {
            var defer = $q.defer();
            var url = "/api/assignment/form/" + formId + "/field/" + fieldId;
            $http.delete(url)
                .success(function(response)
                {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function updateField(formId, fieldId, field)
        {
            var defer = $q.defer();
            var url = "/api/assignment/form/" + formId + "/field/" + fieldId;
            $http.put(url,field)
                .success(function(response)
                {
                    defer.resolve(response);
                });
            return defer.promise;
        }

        function cloneField(formId, field)
        {
            var defer = $q.defer();
            var url = "/api/assignment/form/" + formId + "/field";
            $http.post(url,field)
                .success(function(response){
                    defer.resolve(response);
                });
            return defer.promise;
        }
    }
})();