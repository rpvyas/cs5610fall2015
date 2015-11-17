"use strict";
(function () {
    angular.module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, FieldService, $rootScope, $location, $routeParams)
    {
        console.log("inside field controller");
        var formId = $routeParams.formId;
        $scope.selectedFormId = formId;
        FieldService.getFieldsForForm(formId)
            .then(function(fields)
            {
                console.log(fields);
                $scope.fields = fields;
            });

        $scope.addField = addField;
        $scope.removeField = removeField;
        $scope.cloneField = cloneField;

        function addField(fieldType)
        {
            var textField = {"id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
            var textAreaField = {"id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
            var dateField = {"id": null, "label": "New Date Field", "type": "DATE"};

            var dropDownField = {"id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                {"label": "Option 1", "value": "OPTION_1"},
                {"label": "Option 2", "value": "OPTION_2"},
                {"label": "Option 3", "value": "OPTION_3"}
            ]};

            var checkBoxField = {"id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                {"label": "Option A", "value": "OPTION_A"},
                {"label": "Option B", "value": "OPTION_B"},
                {"label": "Option C", "value": "OPTION_C"}
            ]};

            var radioBoxField = {"id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                {"label": "Option X", "value": "OPTION_X"},
                {"label": "Option Y", "value": "OPTION_Y"},
                {"label": "Option Z", "value": "OPTION_Z"}
            ]};

            var field;
            if(fieldType === "Single Line Text Field")
            {
                field = textField;
            }
            else if(fieldType === "Multi Line Text Field")
            {
                field = textAreaField;
            }
            else if(fieldType === "Date Field")
            {
                field = dateField;
            }
            else if(fieldType === "Dropdown Field")
            {
                field = dropDownField;
            }
            else if(fieldType === "CheckBoxes Field")
            {
                field = checkBoxField;
            }
            else if(fieldType === "Radio Buttons Field")
            {
                field = radioBoxField;
            }

            FieldService.createFieldForForm(formId, field)
                .then(function(fields)
                {
                    console.log(fields);
                    $scope.fields = fields;
                });
        }

        function removeField(field)
        {
            FieldService.deleteFieldFromForm(formId, field.id)
                .then(function(fields)
                {
                    console.log(fields);
                    $scope.fields = fields;
                });
        }

        function cloneField(field)
        {
            FieldService.cloneField(formId, field)
                .then(function(fields)
                {
                    console.log(fields);
                    $scope.fields = fields;
                });
        }

    }
})();