import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base'

import './index.html';


Template.index.onCreated(function bodyOnCreated() {
	Meteor.subscribe('user');
	//Creating dummy users
	Accounts.createUser({
	    username: 'admin',
	    password: '123456'
	});
	Accounts.createUser({
	    username: 'customer',
	    password: '123456'
	});
});


Template.index.helpers({
	getInventories() {
		return Inventory.find({});
	},
})

Template.index.events({
	'click #login-btn' (event) {
		var uname = $('#login-uname').val();
		var pword = $('#login-pword').val();

		Meteor.loginWithPassword(uname, pword, function(resp) {
			if(resp == undefined) {
				if(uname == 'admin')
					Router.go('admin_route');
				else
					Router.go('customer_route');
			}
			else {
				$('#err-mssg').html('Error: ' + resp.reason);
			}
		});
	},
})