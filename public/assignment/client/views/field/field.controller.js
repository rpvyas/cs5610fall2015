/**
 * Created by Riddhi Rathod on 11/10/15.
 */
"use strict";
(function () {
    angular.module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, FieldService, $rootScope, $location, $routeParams) {
        var userId = $routeParams.userId;
        var formId = $routeParams.formId;
        console.log(" form id is "+ formId);
        $scope.fieldsOption = [
            { name: "Single Line Text Field", id: 0 },
            { name: "Multi Line Text Field", id: 1 },
            { name: "Date Field", id: 2 },
            { name: "Dropdown Field", id: 3 },
            { name: "CheckBoxes Field", id: 4 },
            { name: "Radio Buttons Field", id: 5 }
        ];

        FieldService.getFieldsForForm(formId)
            .then(function(fields){
                $scope.fields = fields;
            });

        $scope.addField = addField;
        $scope.removeField = removeField;
        $scope.clone = clone;
        $scope.editField = editField;
        $scope.reorderField = reorderField;

        function addField(modelType) {
            var textField = {"label": "New Text Field", "fieldType": "TEXT", "placeholder": "New Field"};
            var textAreaField = {"label": "New Text Field", "fieldType": "TEXTAREA", "placeholder": "New Field"};
            var dateField = {"label": "New Date Field", "fieldType": "DATE"};

            var dropDownField = {"label": "New Dropdown", "fieldType": "OPTIONS", "options": [
                {"label": "Option 1", "value": "OPTION_1"},
                {"label": "Option 2", "value": "OPTION_2"},
                {"label": "Option 3", "value": "OPTION_3"}
            ]};

            var checkBoxField = {"label": "New Checkboxes", "fieldType": "CHECKBOXES", "options": [
                {"label": "Option A", "value": "OPTION_A"},
                {"label": "Option B", "value": "OPTION_B"},
                {"label": "Option C", "value": "OPTION_C"}
            ]};

            var radioBoxField = {"label": "New Radio Buttons", "fieldType": "RADIOS", "options": [
                {"label": "Option X", "value": "OPTION_X"},
                {"label": "Option Y", "value": "OPTION_Y"},
                {"label": "Option Z", "value": "OPTION_Z"}
            ]};

            var field;
            if(modelType === "Single Line Text Field"){
                field = textField;
            } else if(modelType === "Multi Line Text Field"){
                field = textAreaField;
            } else if(modelType === "Date Field"){
                field = dateField;
            } else if(modelType === "Dropdown Field"){
                field = dropDownField;
            } else if(modelType === "CheckBoxes Field"){
                field = checkBoxField;
            } else if(modelType === "Radio Buttons Field"){
                field = radioBoxField;
            }


            if(!(typeof field === "undefined")) {
                FieldService.createFieldForForm(formId, field)
                    .then(function(fields) {
                        $scope.fields = fields;
                        $rootScope.fields = fields;
                        console.log("*****************SCOPE FIELDS******************");
                        console.log(fields);
                    });
            }

            $scope.fields = $rootScope.fields;
        }

        function removeField(field){
            FieldService.deleteFieldFromForm(formId, field._id)
                .then(function(fields){
                    $scope.fields = fields;
                });
        }

        function clone(field){
            var fieldType = field.fieldType;
            var modelType;
            if(fieldType === "TEXT"){
                modelType = "Single Line Text Field";
            } else if(fieldType === "TEXTAREA"){
                modelType = "Multi Line Text Field";
            } else if(fieldType === "DATE"){
                modelType = "Date Field";
            } else if(fieldType === "OPTIONS"){
                modelType = "Dropdown Field";
            } else if(fieldType === "CHECKBOXES"){
                modelType = "CheckBoxes Field";
            } else if(fieldType === "RADIOS"){
                modelType = "Radio Buttons Field";
            }

            addField(modelType);
            //FieldService.cloneField(formId, field)
            //    .then(function(fields){
            //        $scope.fields = fields;
            //    });
        }

        function editField(field) {
            //FieldService.updateField(formId, field._id, field)
            //    .then(function(fields) {
            //        $scope.fields = fields;
            //    });
        }

        function reorderField(field) {

        }
    }
})();

//"use strict";
//(function () {
//    angular.module("FormBuilderApp")
//        .controller("FieldController", FieldController);
//
//    function FieldController($scope, FieldService, $rootScope, $location, $routeParams)
//    {
//        console.log("inside field controller");
//        var formId = $routeParams.formId;
//        $scope.selectedFormId = formId;
//        FieldService.getFieldsForForm(formId)
//            .then(function(fields)
//            {
//                console.log(fields);
//                $scope.fields = fields;
//            });
//
//        $scope.addField = addField;
//        $scope.removeField = removeField;
//        $scope.cloneField = cloneField;
//
//        function addField(fieldType)
//        {
//            var textField = {"id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
//            var textAreaField = {"id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
//            var dateField = {"id": null, "label": "New Date Field", "type": "DATE"};
//
//            var dropDownField = {"id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
//                {"label": "Option 1", "value": "OPTION_1"},
//                {"label": "Option 2", "value": "OPTION_2"},
//                {"label": "Option 3", "value": "OPTION_3"}
//            ]};
//
//            var checkBoxField = {"id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
//                {"label": "Option A", "value": "OPTION_A"},
//                {"label": "Option B", "value": "OPTION_B"},
//                {"label": "Option C", "value": "OPTION_C"}
//            ]};
//
//            var radioBoxField = {"id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
//                {"label": "Option X", "value": "OPTION_X"},
//                {"label": "Option Y", "value": "OPTION_Y"},
//                {"label": "Option Z", "value": "OPTION_Z"}
//            ]};
//
//            var field;
//            if(fieldType === "Single Line Text Field")
//            {
//                field = textField;
//            }
//            else if(fieldType === "Multi Line Text Field")
//            {
//                field = textAreaField;
//            }
//            else if(fieldType === "Date Field")
//            {
//                field = dateField;
//            }
//            else if(fieldType === "Dropdown Field")
//            {
//                field = dropDownField;
//            }
//            else if(fieldType === "CheckBoxes Field")
//            {
//                field = checkBoxField
//            }
//            else if(fieldType === "Radio Buttons Field")
//            {
//                field = radioBoxField;
//            }
//            FieldService.createFieldForForm(formId, field)
//                .then(function(fields)
//                {
//                    $scope.fields = fields;
//                    console.log("**SUCCESS**");
//                    console.log(fields);
//                });
//        }
//
//        function removeField(field)
//        {
//            FieldService.deleteFieldFromForm(formId, field._id)
//                .then(function(fields)
//                {
//                    console.log(fields);
//                    $scope.fields = fields;
//                });
//        }
//
//        function cloneField(field)
//        {
//            FieldService.cloneField(formId, field)
//                .then(function(fields)
//                {
//                    console.log(fields);
//                    $scope.fields = fields;
//                });
//        }
//
//    }
//})();