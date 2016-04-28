var ResponseCodes = require('./ResponseCodes')

var UserRegistration = require('./EventHandlers/UserRegistration/UserRegistration')
var UserAuthentication = require('./EventHandlers/UserAuthentication/UserAuthentication')
var ItemAddition = require('./EventHandlers/ItemAddition/ItemAddition')
var ItemBrowsing = require('./EventHandlers/ItemBrowsing/ItemBrowsing')
var ItemRemoval = require('./EventHandlers/ItemRemoval/ItemRemoval')

module.exports = {
    bindEvents: function(server, database, Error) {
        server.on('connection', function(socket) {
			UserRegistration.bindEvents(socket, database, ResponseCodes, Error)
            UserAuthentication.bindEvents(socket, database, ResponseCodes, Error)
            ItemAddition.bindEvents(socket, database, ResponseCodes, Error)
            ItemBrowsing.bindEvents(socket, database, ResponseCodes, Error)
            ItemRemoval.bindEvents(socket, database, ResponseCodes, Error)
        })
    }
}
