export const CRUD = {
	list: function(collection) {
		var fn = function(filter={}) {
			return collection.find({});
		}
		return fn
	},

	insert: function(collection) {
		var fn = function(payload) {
			var insert = collection.insert(payload);
			return insert;
		}
		return fn
	},

	update: function(collection) {
		var fn = function(payload, filter={}) {
			return collection.update(filter, payload);
		}
		return fn
	},

	'remove': function(collection) {
		var fn = function(filter={}) {
			return collection.remove(filter);
		}
		return fn
	} 
};