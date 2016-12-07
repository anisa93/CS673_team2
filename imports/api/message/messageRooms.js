import { Mongo } from 'meteor/mongo';

export const MessageRooms = new Mongo.Collection('MessageRooms');




/** Schema for message room data. List of messages from users. Not all the messages.*/
MessageRooms.schema = new SimpleSchema({
  newMessageId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  NumOfNewMessages: {type: Number, defaultValue: 0},
  userId1: {type: String, regEx: SimpleSchema.RegEx.Id}, //smaller id is userId1
  userId2: {type: String, regEx: SimpleSchema.RegEx.Id},
  createdAt: {type: Date},
  updatedAt:{type: Date},
});

if(Meteor.server){
  MessageRooms._ensureIndex({userId1: 1, userId2: -1}, {unique: true});
}

MessageRooms.allow({
  insert: function (userId, doc) {
    // the user must be logged in, and the document must be owned by the user
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    return true;
  },
  remove: function (userId, doc) {
    // can only remove your own documents
    return false;
  },
});
