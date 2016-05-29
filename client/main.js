import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.contactList.onCreated(function helloOnCreated() {

    var self = this;

    self.refresh = new ReactiveVar(0);
    self.msg = new ReactiveVar("");
    self.doc = new ReactiveVar(null);

    self.autorun(function () {
        var refresh = self.refresh.get();
        var handle = self.subscribe('contacts', refresh);
    });

    self.doRefresh = function(){
        // force instance subscription to refire
        var refresh = Number(self.refresh.get());
        refresh += 1;
        console.log('refreshing the data with ' + refresh);
        self.refresh.set(refresh);
    }

    self.displayMessage = function(msg){
        self.msg.set(msg);
        // auto clear it after 3 secs
        setTimeout(function(){
            self.msg.set('');
        }, 3000);
    }

});

Template.contactList.helpers({
    contact: function(){
        return Contacts.find();
    },
    errMessage: function(){
        return Template.instance().msg.get();
    },
    formattedDate: function(d){
        return ("0"+(d.getMonth()+1)).slice(-2) + "." + ("0" + d.getDate()).slice(-2) + "." + d.getFullYear();
        //return moment(val).format('MM/DD/YYYY')
    },
    contactHandler: function(data) {
    	const self = Template.instance();
    	return {
      		data,
      		refreshData() {
                self.doRefresh();
      		},
            showMessage(msg){
                self.displayMessage(msg);
            },
            currentDoc(){
                return self.doc.get();
            }
    	};
	}
});

Template.contactList.events({
    'click #cmdAddContact': function(event, template){
        $('#newContactForm')[0].reset();
        $('#newContactModal').modal('show');
    },
    'click #cmdEditContact': function(event, template){
        template.doc.set(this);
        $('#editContactForm')[0].reset();
        $('#editContactModal').modal('show');
    },
    'click #cmdDeleteContact': function(event, template){
        var id = this.id;
        var name = this.firstName + ' ' + this.lastName;
        if(confirm("Are you sure you want to remove " + name + "?")){
            Meteor.call('deleteContact', id, function(err, result){
                if(err){
                    template.displayMessage(err.reason);
                }
                else{
                    template.displayMessage(name + ' removed successfully');
                    template.doRefresh();
                }
            });
        }
    }
});
