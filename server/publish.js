import { Mongo } from 'meteor/mongo';
import {Inventory} from '../import/api/inventory.js'
import {Cart} from '../import/api/cart.js'


Meteor.publish('inventory', function (){ 
  	return Inventory.find({});
});

Meteor.publish('cart', function (){ 
  	return Cart.find({});
});

Meteor.publish('user', function (){ 
  	return Meteor.users.find({});
});