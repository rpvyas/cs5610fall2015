"use strict";

//GET /api/assignment/form/:formId/field

//GET /api/assignment/form/:formId/field/:fieldId

//DELETE /api/assignment/form/:formId/field/:fieldId

//POST /api/assignment/form/:formId/field

//PUT /api/assignment/form/:formId/field/:fieldId


module.exports = function(app,model)
{
    app.get("/api/assignment/form/:formId/field", function(req,res)
    {
        //return an array of fields belonging to a form object
        // whose id is equal to the formId path parameter
        res.json(model.FindById(req.params.formId).fields);
    });

    app.get("/api/assignment/form/:formId/field/:fieldId", function(req,res)
    {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(model.FindFormFieldById(formId,fieldId));
    });

    app.post("/api/assignment/form/:formId/field", function(req,res)
    {
        res.json(model.AddFormField(req.params.formId, req.body));
    });

    app.put("/api/assignment/form/:formId/field/:fieldId",function(req,res)
    {
        res.json(model.UpdateFormField(req.params.formId, req.params.fieldId, req.body));
    });

    app.delete("/api/assignment/form/:formId/field/:fieldId",function(req,res)
    {
        res.json(model.DeleteFormField(req.params.formId, req.params.fieldId));
    });
};