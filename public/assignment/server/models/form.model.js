"use strict";
var forms = require("./form.mock.json");

module.exports = function(app)
{
    var api =
    {
        Create : Create,
        FindAll : FindAll,
        FindFormByTitle : FindFormByTitle,
        FindById : FindById,
        Update : Update,
        Delete : Delete,
        FindFormFieldById : FindFormFieldById,
        AddFormField : AddFormField,
        UpdateFormField : UpdateFormField,
        DeleteFormField : DeleteFormField
    };
    return api;


    function Create(form, userId)
    {
        console.log("inside create form ");
        form.userId = userId;
        form.id = guid();
        form.fields = [];
        forms.push(form);
        console.log("form "+ form.title + " created");
        return forms;
    }

    function FindAll()
    {
        return forms;
    }

    function FindById(id)
    {
        for(var i=0; i<forms.length; i++)
        {
            if(id === forms[i].id)
            {
                return forms[i];
            }
        }
        console.log("form with the id "+ id + " not found");
        return null;
    }

    function Update(id, form)
    {
        for(var i=0; i<forms.length; i++)
        {
            if(id === forms[i].id)
            {
                forms[i].title = form.title;
                forms[i].userId = form.userId;
                return forms[i];
            }
        }
        console.log("form with the id "+ id + " not found");
        return null;
    }

    function Delete(id)
    {
        for(var i=0; i<forms.length; i++)
        {
            if (id == forms[i].id)
            {
                forms.splice(i, 1);
                console.log("form deleted");
            }
        }
        return forms;
    }

    function FindFormByTitle(title)
    {
        for(var i=0; i<forms.length; i++)
        {
            if(title === forms[i].title)
            {
                return forms[i];
            }
        }
        console.log("form "+ title + " not found");
        return null;
    }


    function FindFormFieldById(formId,fieldId)
    {
        for(var i=0; i<forms.length; i++)
        {
            if (forms[i].id === formId)
            {
                for (var j=0; j < forms[i].fields.length; j++)
                {
                    if (forms[i].fields[j].id === fieldId)
                    {
                        return forms[i].fields[j];
                    }
                }
            }
        }
        console.log("form field not found");
        return null;
    }

    function AddFormField(formId, field)
    {
        field.id = guid();
        for(var i=0; i<forms.length; i++)
        {
            if (formId === forms[i].id)
            {
                if(forms[i].fields == null)
                {
                    forms[i].fields = [];
                }
                forms[i].fields.push(field);
                return forms[i].fields;
            }
        }
    }

    function UpdateFormField(formId, fieldId, field)
    {
        for(var i=0; i<forms.length; i++)
        {
            if(forms[i].id === formId)
            {
                for(var j = 0; j<forms[i].fields.length; j++)
                {
                    if(forms[i].fields[j].id === fieldId)
                    {
                        forms[i].fields[j] = field;
                    }
                }
                return forms[i].fields;
            }
        }
    }

    function DeleteFormField(formId, fieldId)
    {
        for(var i=0; i<forms.length; i++)
        {
            if(forms[i].id == formId)
            {
                for(var j = 0; j<forms[i].fields.length; j++)
                {
                    if(forms[i].fields[j].id === fieldId)
                    {
                        forms[i].fields.splice(j,1);
                    }
                }
                return forms[i].fields;
            }
        }
    }


    function guid()
    {
        function s4()
        {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
};