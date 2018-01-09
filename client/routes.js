import { Meteor } from 'meteor/meteor';
import { Router } from 'meteor/iron:router';

import './pages/index/index.js'
import './pages/admin/admin.js'
import './pages/customer/customer.js'

ROUTES = {
  'index_route': {name: 'index_route', description: 'Login page', path: '/', layoutTemplate: 'index'},
  'admin_route': {name: 'admin_route', description: 'Admin page', path: '/admin', layoutTemplate: 'admin'},
  'customer_route': {name: 'customer_route', description: 'Customer page', path: '/customer', layoutTemplate: 'customer'},
};


Router.map(function() {
    _.each(ROUTES, function(route, path) {
        Router.route(route.path, route);
    });
});