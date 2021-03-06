const { mergeTypes } = require('merge-graphql-schemas');

const userType = require('./User/schema');
const roleType = require('./Role/schema');
const messageType = require('./Message/schema');
const chatType = require('./Chat/schema')

const types = [userType, roleType, messageType, chatType];

// NOTE: 2nd param is optional, and defaults to false
// Only use if you have defined the same type multiple times in
// different files and wish to attempt merging them together.
const schemas =  mergeTypes(types, { all: true });
module.exports = schemas;