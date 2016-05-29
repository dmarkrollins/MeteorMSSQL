var newContactTemplate = null;

AutoForm.hooks({
	newContactForm: {
        onSuccess: function(operation, result, template) {
			$('#newContactModal').modal('hide');
            newContactTemplate.refreshParentData();
		},
		onError: function(operation, error, template) {
			if(error && operation == 'method'){
				var e = $('#errorMessage');
				if(e){
					e[0].innerText = error.reason;
				}
				else{
					alert(error.reason);
				}
			}
		}
	}
});

Template.newContact.onCreated(function(){

    newContactTemplate = this;

    var self = this;

    self.refreshParentData = function(name) {
        self.data.refreshData();
        self.data.showMessage("Contact created successfully.");
    }

});

Template.newContact.helpers({
    contactSchema: function(){
        return ContactSchema;
    }
});
