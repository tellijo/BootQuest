/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');

// When the user disconnects.. perform this
function onDisconnect(socket) {
}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', function (data) {
    console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
  });

  // Insert sockets below
  require('../api/characterAttribute/characterAttribute.socket').register(socket);
  require('../api/attribute/attribute.socket').register(socket);
  require('../api/klass/klass.socket').register(socket);
  require('../api/race/race.socket').register(socket);
  require('../api/supportMagicType/supportMagicType.socket').register(socket);
  require('../api/defenseMagicType/defenseMagicType.socket').register(socket);
  require('../api/attackMagicType/attackMagicType.socket').register(socket);
  require('../api/potionType/potionType.socket').register(socket);
  require('../api/armorType/armorType.socket').register(socket);
  require('../api/weaponType/weaponType.socket').register(socket);
  require('../api/supportMagic/supportMagic.socket').register(socket);
  require('../api/defenseMagic/defenseMagic.socket').register(socket);
  require('../api/attackMagic/attackMagic.socket').register(socket);
  require('../api/potion/potion.socket').register(socket);
  require('../api/armor/armor.socket').register(socket);
  require('../api/weapon/weapon.socket').register(socket);
  require('../api/character/character.socket').register(socket);
}

module.exports = function (socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  socketio.on('connection', function (socket) {
    socket.address = socket.handshake.address !== null ?
            socket.handshake.address.address + ':' + socket.handshake.address.port :
            process.env.DOMAIN;

    socket.connectedAt = new Date();

    // Call onDisconnect.
    socket.on('disconnect', function () {
      onDisconnect(socket);
      console.info('[%s] DISCONNECTED', socket.address);
    });

    // Call onConnect.
    onConnect(socket);
    console.info('[%s] CONNECTED', socket.address);
  });
};