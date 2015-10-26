(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($scope,$location,$rootScope,FormService)
    {
        //$rootScope.forms = [];
        $scope.forms =[];
        console.log("Form Controller function called!");
        //$scope.hello = "hello from header controller";
        $scope.$location = $location;
        $scope.addForm = addForm;
        $scope.selectForm = selectForm;
        $scope.deleteForm = deleteForm;
        $scope.tempforms=[];
        //$scope.forms = $rootScope.forms;

        setFormsForLoggedInUser($rootScope.user);
        function setFormsForLoggedInUser(user)
        {
            FormService.findAllFormsForUser(user.id,function(forms){
                if(forms.length >= 0)
                {
                    $scope.forms = forms;
                }

            });

        }
        function getFormsForLoggedInUser(user)
        {
            FormService.findAllFormsForUser(user.id,function(forms){
                if(forms.length >= 0)
                {
                    return forms;
                }

            });

        }


        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }


        function addForm(form)
        {
            //console.log($scope.forms);
            console.log("add function called!");
            var currentUserId = $rootScope.user.id;
            var newForm = {
                userId:currentUserId,
                formId: guid(),
                name:form.name
            };

            FormService.createFormForUser(currentUserId,newForm,function(form){
                console.log("form created");
            })
            //$scope.forms = getFormsForLoggedInUser($rootScope.user);
            $scope.forms.push(newForm);
        }

        //function deleteForm(form)
        //{
        //    var index = $scope.forms.indexOf(form);
        //    FormService.dele
        //        $scope.forms.splice(index, 1);
        //
        //}


        function deleteForm(index)
        {
            var myforms = FormService.findAllFormsForUser($rootScope.user.id,function(forms){
                console.log("in call back for findallformsforuser");

                console.log(forms);
                $scope.tempforms = forms;

            });
            console.log("***********");
            console.log($scope.tempforms)
            var formToDelete = $scope.tempforms[0];
            FormService.deleteFormById(formToDelete.formId,function(forms){
                $scope.forms = forms;
            });
            $scope.tempforms = [];
            //$scope.forms = getFormsForLoggedInUser($rootScope.user);

        }

        function selectForm(index)
        {
            $scope.selectedFormIndex = index;
            $scope.form = {
                name: $scope.forms[index].name
            };
        }

        function updateForm(form)
        {
            console.log("add function called!");
            var currentUserId = $rootScope.user.id;
            var newForm = {
                userId:currentUserId,
                formId: guid(),
                name:form.name
            };

            FormService.createFormForUser(currentUserId,newForm,function(form){
                console.log("form created");
            })
            $rootScope.forms.push(newForm);
        }


    }



})();
