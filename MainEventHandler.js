UserRegistration = require('./EventHandlers/UserRegistration')
UserAuthentication = require('./EventHandlers/UserAuthentication')

module.exports = {
    bindEvents: function(server, database) {
        server.on('connection', function(socket) {
            console.log("Connected...")
			UserRegistration.bindEvents(socket, database)
            UserAuthentication.bindEvents(socket, database)
        })
    }
}
