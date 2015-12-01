'use strict';
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($scope,$location,$rootScope,FormService)
    {
        console.log("registered user "+ $rootScope.user.username);
        //$rootScope.forms = [];
        $scope.forms =[];
        console.log("Form Controller function called!");
        //$scope.hello = "hello from header controller";
        $scope.$location = $location;
        $scope.addForm = addForm;
        $scope.selectForm = selectForm;
        $scope.deleteForm = deleteForm;
        $scope.updateForm = updateForm;
        $scope.navigateToFields = navigateToFields;
        $scope.tempforms=[];
        //$scope.forms = $rootScope.forms;

        FormService.findAllFormsForUser($rootScope.user._id)
                .then(function(forms)
                {
                    $scope.forms = forms;
                });


        //function guid() {
        //    function s4() {
        //        return Math.floor((1 + Math.random()) * 0x10000)
        //            .toString(16)
        //            .substring(1);
        //    }
        //    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        //        s4() + '-' + s4() + s4() + s4();
        //}


        function addForm(form)
        {
            console.log("inside add form");
            var form ={title: $scope.formName};
            console.log($scope.formName);
            if(!angular.isUndefined($scope.formName))
            {
                FormService.createFormForUser($rootScope.user._id, form)
                    .then(function(forms)
                    {
                        FormService.findAllFormsForUser($rootScope.user._id)
                            .then(function(forms)
                            {
                                $scope.forms = forms;
                                $scope.formName = "";
                            });
                    });
            }
        }

        //function deleteForm(form)
        //{
        //    var index = $scope.forms.indexOf(form);
        //    FormService.dele
        //        $scope.forms.splice(index, 1);
        //
        //}


        function deleteForm(formId)
        {
            console.log("inside delete form");
            FormService.deleteFormById(formId)
                .then(function (forms)
                {
                    FormService.findAllFormsForUser($rootScope.user._id)
                        .then(function (forms)
                        {
                            console.log(forms);
                            $scope.forms = forms;
                        });
                });

        }

        function selectForm(index)
        {
            console.log("inside select form");
            console.log("selected id "+ $scope.forms[index]._id);
            $scope.selectedFormId = $scope.forms[index]._id;
            $rootScope.selectedFormId = $scope.selectedFormId;
            $scope.formName = $scope.forms[index].title;
            $scope.index = index;
        }

        function updateForm(newform)
        {
            if (!angular.isUndefined(index))
            {
                if (!angular.isUndefined($scope.formName))
                {
                    var newForm =
                    {
                        title: $scope.formName,
                        userId: $rootScope.user._id
                    };
                    FormService.updateFormById(selectedFormId, newForm).then(function (updatedForm)
                    {
                        $scope.forms[index] = updatedForm;
                        $scope.formName = "";
                    })
                }
            }

        }

        function navigateToFields(formId)
        {
            console.log("Inside navigate function");
            var path = "/user/" + $rootScope.user._id + "/form/" + formId + "/fields";
            console.log(path);
            $location.path(path);
        }


    }



})();
