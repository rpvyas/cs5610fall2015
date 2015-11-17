(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);
    function FieldController($scope, $location, FormService, $rootScope,FieldService,$routeParams)
    {

        $scope.$location = $location;
        $scope.user = $rootScope.user;
        $scope.fields = [];
        $scope.newFieldType = "";

        $scope.formID = $routeParams.formId;
        $scope.userID = $routeParams.userId;


        $scope.addFienld = addField;
        $scope.deleteField = deleteField;


        getFields();
        function getFields()
        {
            if ($scope.selectedForm)
            {
                FieldService.getFieldsForForm($scope.selectedForm.id)
                    .then(function(fields)
                    {
                        $scope.fields = fields;
                    })
            }
            else
            {
                console.log("no form selected");
            }
        };

        function clone(source)
        {
            if (source && typeof source == "object")
            {
                return JSON.parse(JSON.stringify(source));
            } else
            {
                return null;
            }
        }



        function addField(fieldType)
        {
            if (fieldType)
            {
                console.log("Field type is " + fieldType);
                $scope.newField.type = fieldType;
                var newFieldObject = clone($scope.newField[fieldType]);
                $scope.fields.push(newFieldObject);

                FieldService.createFieldForForm($scope.selectedForm.id, newFieldObject)
                    .then(function(fields)
                    {
                        $scope.fields = fields;
                    })
            }
        };


        function deleteField(field)
        {
            $scope.error = "";
            if (field){
                FieldService.deleteFieldFromForm($scope.selectedForm.id, field.id)
                    .then(function(remainingFields){
                        $scope.fields = remainingFields;
                    })
                    .catch(function(error){
                        $scope.error = error;
                    });
            } else {
                $scope.error = "Please select a field type to delete";
            }
        };


    }
})();