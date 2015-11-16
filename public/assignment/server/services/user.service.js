"use strict"

//POST /api/assignment/user
//creates a new user embedded in the body of the request, and responds with an array of all users
//GET /api/assignment/user
//responds with an array of all users
//GET /api/assignment/user/:id
//responds with a single user whose id property is equal to the id path parameter
//GET /api/assignment/user?username=username
//    responds with a single user whose username property is equal to the username path parameter
//GET /api/assignment/user?username=alice&password=wonderland
//    responds with a single user whose username property is equal to the username path parameter and its password is equal to the password path parameter
//PUT /api/assignment/user/:id
//updates an existing user whose id property is equal to the id path parameter. The new properties are set to the values in the user object embedded in the HTTP request. Responds with an array of all users
//DELETE /api/assignment/user/:id



module.exports = function(app,model)
{
    app.post("/api/assignment/user", function(req,res)
    {
        res.json(model.Create(req.body));
    });

    app.get('/api/assignment/user', function(req,res)
    {
        var username = req.param("username");
        var password = req.param("password");

        if(typeof username === 'undefined' && typeof password === 'undefined')
        {
            //returning array of all users
            res.json(model.FindAll());
        }
        else if(username != null && password != null)
        {
            var credentials =
            {
                username : username,
                password : password
            };
            res.json(model.FindUserByCredentials(credentials));
        }
        else
        {
            res.json(model.FindUserByUsername(username));
        }
    });

    app.get("/api/assignment/user/:id", function(req,res)
    {
        res.json(model.FindById(req.params.id));
    });

    app.put("/api/assignment/user/:id",function(req,res)
    {
        res.json(model.Update(req.params.id, req.body));
    });

    app.delete("/api/assignment/user/:id", function(req, res)
    {
        res.json(model.Delete(req.params.id));
    });
};