UserRegistration = require('./EventHandlers/UserRegistration')

module.exports = {
    bindEvents: function(server, database) {
        server.on('connection', function(socket) {
			UserRegistration.bindEvents(socket, database)
        })
    }
}
