import { Mongo } from 'meteor/mongo';
import {CRUD} from './crud.js'
import {Cart} from './cart.js'

export const Inventory = new Mongo.Collection('inventory');

Inventory.allow({
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
    'inventory.insert': CRUD.insert(Inventory),
    'inventory.update': CRUD.update(Inventory),
    'inventory.remove': function(filter={}) {
        var ids = [];
        var inventories = Inventory.find(filter).fetch();
        inventories.forEach(function(item) {
            ids.push(item._id);
        });
        if(CRUD.remove(Inventory)(filter) > 0)
            Meteor.call('cart.remove', {'inventory_id': {'$in': ids}});
    },
})