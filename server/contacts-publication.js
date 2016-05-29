Meteor.publish('contacts', function(val) {

    // val could be the page you're on if you want
    // just using it to fire this publication reactively for now

    var self = this;

    try {

        // might want to use a sproc here leveraging sqlserver paging
        var res = Sql.q("select * from kreig.contacts");

        _.each(res, function(contact) {
            self.added('contacts', contact.id, contact);
        });

        self.ready();

    }
    catch (err) {
        throw new Meteor.Error("sql-error", err.reason);
    }

});
