import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Cart } from '../../../import/api/cart.js';
import { Inventory } from '../../../import/api/inventory.js';

import './customer.html';
import '../admin/admin.js';


Template.customer.onCreated(function bodyOnCreated() {
	Meteor.subscribe('cart')
});


Template.customer.helpers({
	getInventories() {
		return Inventory.find({published: true});
	}
})


Template.cart.helpers({
	getCart() {
		var cart = Cart.find({}).fetch();
		cart.forEach(function(item) {
			item['inventory'] = Inventory.findOne({'_id': item.inventory_id});
		});
		return cart;
	},

	computeTotal(price, quantity) {
		return parseFloat(price * quantity);
	},

	recompute() {
		var cart = Cart.find({}).fetch();
		var total = 0;
		cart.forEach(function(item) {
			var inventory = Inventory.findOne({'_id': item.inventory_id});
			total += parseFloat(inventory.price * item.quantity);
		});
		return total;
	}
})

Template.cart_list.helpers({
	computeTotal(price, quantity) {
		return parseFloat(price * quantity);
	},

	concat(str1, str2) {
		return str1 + str2;
	},
})


Template.customer.events({
	'click #add-cart-btn' (event) {
		$('.products-checkbox:checkbox:checked').each(function() {
			var payload = {
				'inventory_id': $(this).val(),
				'quantity': 1
			};
			Meteor.call('cart.insert', payload);
		})
		$('.products-checkbox').removeAttr('checked','checked');
	},

	'click #cancel-cart-btn' (event) {
		Meteor.call('cart.remove', {});
	},

	'click #update-cart-btn' (event) {
		var cartList = Cart.find({}).fetch();
		cartList.forEach(function(item) {
			var quantity = $('#' + item._id).val();
			var inventory = Inventory.findOne({'_id': item.inventory_id});
			$('#' + item._id + '-total').html(inventory.price * quantity);
			Meteor.call(
				'cart.update', 
				{$set: {quantity: parseInt(quantity)}},
				{'_id': item._id}
			);
			$('#total-price-label').html(0);
		});
	},
})


Template.cart.events({
	'keyup .products-quantity' (event) {
		var quantity = $('#' + this._id).val();
		var totalPrice = parseFloat(this.inventory.price * quantity);
		$('#' + this._id + '-total').html(totalPrice);

		var total = 0;
		$('.total-prices').each(function() {
			total += parseFloat($(this).html());
		})
		$('#total-price-label').html(total);
	},
})