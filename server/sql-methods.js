Meteor.methods({

    getContacts:function(){

        try {
            var res = Sql.q("select * from kreig.contacts");
            return res;
        }
        catch (err) {
            throw new Meteor.Error("sql-error", err.reason);
        }

    },

    createContact: function(doc){

        //console.log(JSON.stringify(doc));

        var query = "insert kreig.contacts (firstName, lastName, occupation, birthDate, comment) " +
                    "values (@firstName, @lastName, @occupation, @birthDate, @comment)";

        try {
            var res = Sql.q(query, [
                { name : 'firstName', type : Sql.driver.NVarChar, value : doc.firstName },
                { name : 'lastName', type : Sql.driver.NVarChar, value : doc.lastName },
                { name : 'birthDate', type : Sql.driver.DateTime, value : doc.birthDate },
                { name : 'occupation', type : Sql.driver.NVarChar, value : doc.occupation },
                { name : 'comment', type : Sql.driver.NVarChar, value : doc.comment }
            ]);
            return res;
        }
        catch (e) {
            throw new Meteor.Error("insert-error", e.message);
        }

    },

    updateContact: function(doc){

        //console.log(JSON.stringify(doc));

        var query = "update kreig.contacts set firstName = @firstName, lastName = @lastName, " +
                    "occupation = @occupation, birthDate = @birthDate, comment = @comment where id = @id";

        try {
            var res = Sql.q(query, [
                { name : 'id', type : Sql.driver.Int, value : doc.id },
                { name : 'firstName', type : Sql.driver.NVarChar, value : doc.firstName },
                { name : 'lastName', type : Sql.driver.NVarChar, value : doc.lastName },
                { name : 'birthDate', type : Sql.driver.DateTime, value : doc.birthDate },
                { name : 'occupation', type : Sql.driver.NVarChar, value : doc.occupation },
                { name : 'comment', type : Sql.driver.NVarChar, value : doc.comment }
            ]);
        }
        catch (e) {
            throw new Meteor.Error("update-error", e.message);
        }

    },

    deleteContact: function(contactId){

        var query = "delete kreig.contacts where id = @id";

        try {
            var res = Sql.q(query, [
                { name : 'id', type : Sql.driver.Int, value : contactId }
            ]);
        }
        catch (e) {
            throw new Meteor.Error("delete-error", e.message);
        }

    }
});
