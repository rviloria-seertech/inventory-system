import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base'
import { Router } from 'meteor/iron:router';

import './template.html';


Template.page_header.helpers({
	isLoggedIn() {
		return Meteor.user() != undefined;
	}
})


Template.page_header.events({
	'click #logout-btn' (event) {
		Meteor.logout(function() {
			Router.go('index_route')
		});
	},
})