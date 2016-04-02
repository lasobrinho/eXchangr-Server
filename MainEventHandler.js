UserRegistration = require('./EventHandlers/UserRegistration/UserRegistration')
UserAuthentication = require('./EventHandlers/UserAuthentication/UserAuthentication')

module.exports = {
    bindEvents: function(server, database) {
        server.on('connection', function(socket) {
			UserRegistration.bindEvents(socket, database)
            UserAuthentication.bindEvents(socket, database)
        })
    }
}
