"use strict";
(function () {
    angular.module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, FormService, $rootScope, $location)
    {
        console.log("inside form controller");
        console.log($rootScope.user);

        setFormsForLoggedInUser($rootScope.user);
        function setFormsForLoggedInUser(user)
        {
            FormService.findAllFormsForUser(user.id)
                .then(function(forms)
                {
                    $scope.forms = forms;
                });

        }

        $scope.addForm = addForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.updateForm = updateForm;
        $scope.navigateToFields = navigateToFields;

        function addForm()
        {
            console.log("inside add form");
            var form ={title: $scope.formName};
            console.log($scope.formName);
            if(!angular.isUndefined($scope.formName))
            {
                FormService.createFormForUser($rootScope.user.id, form)
                    .then(function(forms)
                    {
                        FormService.findAllFormsForUser($rootScope.user.id)
                            .then(function(forms)
                            {
                                $scope.forms = forms;
                                $scope.formName = "";
                            });
                    });
            }
        }

        function navigateToFields(index)
        {
            var path = "/user/" + $rootScope.user.id + "/form/" + $scope.forms[index].id + "/fields";
            console.log(path);
            $location.path(path);
        }

        function deleteForm(formId)
        {
            console.log("inside delete form");
            FormService.deleteFormById(formId)
                .then(function (forms)
                {
                    FormService.findAllFormsForUser($rootScope.user.id)
                        .then(function (forms)
                        {
                            console.log(forms);
                            $scope.forms = forms;
                        });
                });
        }

        function updateForm(selectedFormId, index)
        {
            if (!angular.isUndefined(index))
            {
                if (!angular.isUndefined($scope.formName))
                {
                    var newForm =
                    {
                        title: $scope.formName,
                        userId: $rootScope.user.id
                    };
                    FormService.updateFormById(selectedFormId, newForm).then(function (updatedForm)
                    {
                        $scope.forms[index] = updatedForm;
                        $scope.formName = "";
                    })
                }
            }
        }

        function selectForm(index)
        {
            console.log("inside select form");
            $scope.selectedFormId = $scope.forms[index].id;
            $scope.formName = $scope.forms[index].title;
            $scope.index = index;
        }




    }
})();








//(function(){
//    angular
//        .module("FormBuilderApp")
//        .controller("FormController",FormController);
//
//    function FormController($scope,$location,$rootScope,FormService)
//    {
//        console.log("registered user "+ $rootScope.user.username);
//        //$rootScope.forms = [];
//        $scope.forms =[];
//        console.log("Form Controller function called!");
//        //$scope.hello = "hello from header controller";
//        $scope.$location = $location;
//        $scope.addForm = addForm;
//        $scope.selectForm = selectForm;
//        $scope.deleteForm = deleteForm;
//        $scope.updateForm = updateForm;
//        $scope.tempforms=[];
//        //$scope.forms = $rootScope.forms;
//

//        function getFormsForLoggedInUser(user)
//        {
//            FormService.findAllFormsForUser(user.id,function(forms){
//                if(forms.length >= 0)
//                {
//                    return forms;
//                }
//
//            });
//
//        }
//
//
//        //function guid() {
//        //    function s4() {
//        //        return Math.floor((1 + Math.random()) * 0x10000)
//        //            .toString(16)
//        //            .substring(1);
//        //    }
//        //    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
//        //        s4() + '-' + s4() + s4() + s4();
//        //}
//
//
//        function addForm(form)
//        {
//            //console.log($scope.forms);
//            console.log("add function called!");
//            var currentUserId = $rootScope.user.id;
//            var newForm =
//            {
//                userId:currentUserId,
//                name:form.name
//            };
//            form.name = "";
//
//            FormService.createFormForUser(currentUserId,newForm);
//
//            //$scope.forms = getFormsForLoggedInUser($rootScope.user);
//            //$scope.forms.push(newForm);
//            setFormsForLoggedInUser($rootScope.user);
//        }
//
//        //function deleteForm(form)
//        //{
//        //    var index = $scope.forms.indexOf(form);
//        //    FormService.dele
//        //        $scope.forms.splice(index, 1);
//        //
//        //}
//
//
//        function deleteForm(index)
//        {
//            FormService.deleteFormById($scope.forms[index].formId,function(forms){
//                $scope.forms = forms;
//            });
//            //$scope.tempforms = [];
//            //$scope.forms = getFormsForLoggedInUser($rootScope.user);
//
//        }
//
//        function selectForm(index)
//        {
//            $scope.selectedFormIndex = index;
//            $scope.form = {
//                name: $scope.forms[index].name
//            };
//        }
//
//        function updateForm(newform)
//        {
//            console.log("update function called!");
//            var currentUserId = $rootScope.user.id;
//            var form = $scope.forms[$scope.selectedFormIndex];
//
//
//            //$scope.courses[$scope.selectedCourseIndex] = {
//            //    title: course.title,
//            //    seats: course.seats,
//            //    start: course.start
//            //};
//
//
//            FormService.updateFormById(form.formId,newform,function(form){
//                console.log("forms");
//                //$scope.forms = forms;
//
//                $scope.forms[$scope.selectedFormIndex] = form;
//
//            })
//
//        }
//
//
//    }
//
//
//
//})();
