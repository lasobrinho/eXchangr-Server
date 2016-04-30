var ResponseCodes = require('./ResponseCodes')

var eventHandlers = [
    require('./EventHandlers/Item/ItemHandler'),
    require('./EventHandlers/User/UserHandler'),
    require('./EventHandlers/Reaction/React')
]

module.exports = {
    bindEvents: function(server, database, Error) {
        server.on('connection', function(socket) {
            eventHandlers.forEach(function(handler) {
                handler.bindEvents(socket, database, ResponseCodes, Error)
            })
        })
    }
}
