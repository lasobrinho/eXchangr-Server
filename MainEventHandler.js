var ResponseCodes = require('./ResponseCodes')

var UserRegistration = require('./EventHandlers/UserRegistration/UserRegistration')
var UserAuthentication = require('./EventHandlers/UserAuthentication/UserAuthentication')
var ItemAddition = require('./EventHandlers/ItemAddition/ItemAddition')


module.exports = {
    bindEvents: function(server, database, Error) {
        server.on('connection', function(socket) {
			UserRegistration.bindEvents(socket, database, ResponseCodes, Error)
            UserAuthentication.bindEvents(socket, database, ResponseCodes, Error)
            ItemAddition.bindEvents(socket, database, ResponseCodes, Error)
        })
    }
}
