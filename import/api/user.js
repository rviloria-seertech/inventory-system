import { Mongo } from 'meteor/mongo';
import {CRUD} from './crud.js'


Meteor.methods({
  	'user.insert': CRUD.insert(Meteor.users),
  	'user.update': CRUD.update(Meteor.users),
  	'user.remove': CRUD.remove(Meteor.users),
})