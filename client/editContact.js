var editContactTemplate = null;

AutoForm.hooks({
	editContactForm: {
        onSuccess: function(operation, result, template) {
			$('#editContactModal').modal('hide');
            editContactTemplate.refreshParentData();
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
		// formToDoc: function(doc, autoform){
		// 	console.log(this.template.data.doc.id);
		// 	doc.id = this.template.data.doc.id;
		// 	return doc;
		// }
	}
});

Template.editContact.onCreated(function(){

    editContactTemplate = this;

    var self = this;

    self.refreshParentData = function(name) {
        self.data.refreshData();
        self.data.showMessage("Contact updated successfully.");
    }

});

Template.editContact.helpers({
    contactSchema: function(){
        return ContactSchema;
    },
    contactDoc: function(){
        return this.currentDoc();
    }
});
