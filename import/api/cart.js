import { Mongo } from 'meteor/mongo';
import {CRUD} from './crud.js'

export const Cart = new Mongo.Collection('cart');

Cart.allow({
    insert: function() {
        return false;
    },
    update: function() {
        return false;
    },
    remove: function() {
        return false;
    }
});

Meteor.methods({
  	'cart.insert': CRUD.insert(Cart),
  	'cart.update': CRUD.update(Cart),
  	'cart.remove': CRUD.remove(Cart),
})