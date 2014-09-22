/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Armor = require('./armor.model');

exports.register = function(socket) {
  Armor.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Armor.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('armor:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('armor:remove', doc);
}