(function(){
    angular
        .module("NewsRoomApp")
        .controller("FormController",FormController);

    function FormController($scope,$location,$rootScope,UserService)
    {
        //$rootScope.forms = [];
        $scope.interests =$rootScope.user.interests;

        //$scope.hello = "hello from header controller";
        $scope.$location = $location;
        $scope.addForm = addForm;
        $scope.selectForm = selectForm;
        $scope.deleteForm = deleteForm;
        $scope.updateForm = updateForm;
        $scope.message = "";
        $scope.tempforms=[];
        //$scope.forms = $rootScope.forms;

        //setFormsForLoggedInUser($rootScope.user);
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


        function addForm(interest)
        {
            for(var i = 0 ; i<$scope.interests.length; i++)
            {
                var current = $scope.interests[i];
                if(current == interest)
                {

                    $scope.message = interest+ " already added in your interests";
                    return;
                }
            }

            //console.log($scope.forms);

            var user = $rootScope.user;

            //update user object

            user.interests.push(interest);

            $scope.interests = user.interests;
            $scope.interest="";

            UserService.updateUser(user, user._id);


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
            $scope.interests.splice(index,1);

            var user = $rootScope.user;
            user.interests = $scope.interests;

            UserService.updateUser(user, user._id)
                .then(function(updatedUser) {

                    $scope.forms = updatedUser.interests;

                });

            //$scope.tempforms = [];
            //$scope.forms = getFormsForLoggedInUser($rootScope.user);

        }

        function selectForm(index)
        {
            $scope.selectedFormIndex = index;
            $scope.selectedInterest = {
                name: $scope.interests[index]
            };
        }

        function updateForm(newform)
        {

            var currentUserId = $rootScope.user.id;
            var form = $scope.forms[$scope.selectedFormIndex];


            //$scope.courses[$scope.selectedCourseIndex] = {
            //    title: course.title,
            //    seats: course.seats,
            //    start: course.start
            //};


            FormService.updateFormById(form.formId,newform,function(form){

                //$scope.forms = forms;

                $scope.forms[$scope.selectedFormIndex] = form;

            })

        }


    }



})();
