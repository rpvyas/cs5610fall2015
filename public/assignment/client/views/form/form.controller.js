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
        $scope.updateForm = updateForm;
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
            form.name = "";

            FormService.createFormForUser(currentUserId,newForm,function(form){
                console.log("form created");
            })
            //$scope.forms = getFormsForLoggedInUser($rootScope.user);
            //$scope.forms.push(newForm);
            setFormsForLoggedInUser($rootScope.user);
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
            FormService.deleteFormById($scope.forms[index].formId,function(forms){
                $scope.forms = forms;
            });
            //$scope.tempforms = [];
            //$scope.forms = getFormsForLoggedInUser($rootScope.user);

        }

        function selectForm(index)
        {
            $scope.selectedFormIndex = index;
            $scope.form = {
                name: $scope.forms[index].name
            };
        }

        function updateForm(newform)
        {
            console.log("update function called!");
            var currentUserId = $rootScope.user.id;
            var form = $scope.forms[$scope.selectedFormIndex];


            //$scope.courses[$scope.selectedCourseIndex] = {
            //    title: course.title,
            //    seats: course.seats,
            //    start: course.start
            //};


            FormService.updateFormById(form.formId,newform,function(form){
                console.log("forms");
                //$scope.forms = forms;

                $scope.forms[$scope.selectedFormIndex] = form;

            })

        }


    }



})();
