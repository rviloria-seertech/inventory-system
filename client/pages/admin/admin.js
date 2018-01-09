import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Inventory } from '../../../import/api/inventory.js';

import './admin.html';


Template.admin.onCreated(function bodyOnCreated() {
	  Meteor.subscribe('inventory')
});


Template.admin.helpers({
	getInventories() {
		return Inventory.find({});
	},
})

Template.admin.rendered = function() {
	$('[data-toggle="tooltip"]').tooltip();
}

Template.admin.events({
	'click #add-submit' (event) {
		var payload = {
			name: $('#add-name').val(),
			description: $('#add-desc').val(),
			price: $('#add-price').val(),
			stock: $('#add-stock').val(),
			published: false
		}
		Meteor.call('inventory.insert', payload);

		$('#add-name').val('');
		$('#add-desc').val('');
		$('#add-price').val('');
		$('#add-stock').val('');
	},

	'click .del-btn' (event) {
		Meteor.call('inventory.remove', {'_id': this._id});
	},

	'click .update-btn' (event) {
		$('#update-name').val(this.name);
		$('#update-desc').val(this.description);
		$('#update-price').val(this.price);
		$('#update-id').val(this._id);
		$('#update-stock').val(this.stock);
		$('#update-mdl').modal('show');
	},

	'click #save-update-btn' (event) {
		var payload = {
			name: $('#update-name').val(),
			description: $('#update-desc').val(),
			price: $('#update-price').val(),
			stock: $('#update-stock').val()
		}
		Meteor.call('inventory.update', {$set: payload}, {'_id': $('#update-id').val()});
		$('#update-mdl').modal('hide');
	},

	'click .publish-unpublish-btn' (event) {
		var payload = {
			published: !this.published
		}
		Meteor.call('inventory.update', {$set: payload}, {'_id': this._id});
	}
})