"use strict";

var q = require("q");

module.exports = function(mongoose, db){
    //var forms = require("./form.mock.json");
    var FormSchema = require('./form.schema.js')(mongoose);
    var FormModel  = mongoose.model("FormModel", FormSchema);

    var api = {
        Create : Create,
        FindAll : FindAll,
        FindFormByTitle : FindFormByTitle,
        FindFormsByUserId : FindFormsByUserId,
        FindById : FindById,
        Update : Update,
        Delete : Delete,

        AddFormField : AddFormField,
        FindField : FindField,
        UpdateFormField : UpdateFormField,
        DeleteFormField : DeleteFormField
    };
    return api;

    function Create(form, userId){
        var deferred = q.defer();
        form.userId = userId;
        form.fields = [];
        FormModel.create(form, function(err, createdForm) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(createdForm);
            }
        });
        return deferred.promise;
    }

    function FindAll(){
        var deferred = q.defer();
        FormModel.find(function(err, forms) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(forms);
            }
        });
        return deferred.promise;
    }

    function FindFormByTitle(title){
        var deferred = q.defer();
        FormModel.findOne({title: title}, function(err, form) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;
    }

    function FindFormsByUserId(userId){
        var deferred = q.defer();
        FormModel.find({userId: userId}, function(err, forms) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(forms);
            }
        });
        return deferred.promise;
    }

    function FindById(id){
        var deferred = q.defer();
        FormModel.findById(id, function(err, form) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;
    }

    function Update(id, form){
        var deferred = q.defer();
        FormModel.findById(id, function(err, formToUpdate) {
            if(err) {
                deferred.reject(err);
            } else {
                formToUpdate.title = form.title;
                formToUpdate.save(function(err, updatedForm) {
                    deferred.resolve(updatedForm);
                });
            }
        });
        return deferred.promise;
    }

    function Delete(id){
        var deferred = q.defer();
        FormModel.remove({_id:id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }

    function AddFormField(formId, field){
        console.log("inside model function");
        //console.log(field);
        var deferred = q.defer();
        console.log(" form id is "+ formId);
        FormModel.findById(formId, function(err, form) {
            if(err) {
                console.log(" first error ");
                deferred.reject(err);
            } else {
                var formFields = form.fields;
                console.log("Before");
                console.log(formFields);
                formFields.push(field);
                console.log("After");
                console.log(formFields);
                form.fields = formFields;
                console.log("updatedForm");
                console.log(form);
                form.save(function(err, document) {
                    //console.log(document);
                    if(err) {
                        console.log("**ERROR ***"+ err);
                        deferred.reject(err);
                    } else {
                        deferred.resolve(document);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function FindField(formId, fieldId){
        var deferred = q.defer();
        FormModel.findById(formId, function(err, form){
            if(err) {
                deferred.reject(err);
            } else {
                var formFields = form.fields;
                for(var i=0; i<formFields.length; i++){
                    if(formFields[i]._id == fieldId){
                        deferred.resolve(formFields[i]);
                    }
                }
            }
        });
        return deferred.promise;
    }

    function UpdateFormField(formId, fieldId, field){
        var deferred = q.defer();
        FormModel.findById(formId, function(err, form){
            if(err) {
                deferred.reject(err);
            } else {
                var formFields = form.fields;
                for(var i=0; i<formFields.length; i++){
                    if(formFields[i]._id == fieldId){
                        formFields[i] = field;
                        break;
                    }
                }
                form.fields = formFields;
                form.save(function(err, updatedForm) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(updatedForm);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function DeleteFormField(formId, fieldId){
        var deferred = q.defer();
        FormModel.findById(formId, function(err, form){
            if(err) {
                deferred.reject(err);
            } else {
                var formFields = form.fields;
                for(var i=0; i<formFields.length; i++){
                    if(formFields[i]._id == fieldId){
                        formFields.splice(i,1);
                    }
                }
                form.fields = formFields;
                form.save(function(err, updatedForm) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(updatedForm);
                    }
                });
            }
        });
        return deferred.promise;
    }
};