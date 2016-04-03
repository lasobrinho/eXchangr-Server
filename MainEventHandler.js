UserRegistration = require('./EventHandlers/UserRegistration/UserRegistration')
UserAuthentication = require('./EventHandlers/UserAuthentication/UserAuthentication')
ItemAddition = require('./EventHandlers/ItemAddition/ItemAddition')
ResponseCodes = require('./ResponseCodes')

module.exports = {
    bindEvents: function(server, database) {
        server.on('connection', function(socket) {
			UserRegistration.bindEvents(socket, database, ResponseCodes)
            UserAuthentication.bindEvents(socket, database, ResponseCodes)
            ItemAddition.bindEvents(socket, database, ResponseCodes)
        })
    }
}
