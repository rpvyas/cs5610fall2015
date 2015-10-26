(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms = [

        ];


        //
        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return service;

        function createFormForUser(userId,form,callback)
        {
            console.log("length of form now is "+ forms.length);
            form.userId = userId;
            forms.push(form);
            return callback(form);
        }

        function findAllFormsForUser(userId,callback)
        {
            var length = forms.length;
            var foundForms = [ ];
            for(var i =0; i<length; i++)
            {
                if(forms[i].userId == userId)
                {
                    foundForms.push(forms[i]);
                }
            }
            return callback(foundForms);
        }

        function deleteFormById(formId, callback)
        {
            var length = forms.length;
            for(var i =0; i<length; i++)
            {
                if(forms[i].formId == formId)
                {
                    forms.splice(i, 1);
                    return callback(forms);
                }
            }
            return callback(null);


        }

        function updateFormById(formId,newForm,callback)
        {
            var length = forms.length;
            for(var i =0; i<length; i++)
            {
                if(forms[i].formId == formId)
                {
                    forms[i].userId = newForm.userId;
                    forms[i].name = newForm.name;
                    return callback(forms[i]);
                }
            }
            return callback("form not found");


        }


    }
})();