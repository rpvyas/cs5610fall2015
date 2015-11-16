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