var ResponseCodes = require('./ResponseCodes')

var eventHandlers = [
    require('./EventHandlers/UserRegistration/UserRegistration'),
    require('./EventHandlers/UserAuthentication/UserAuthentication'),
    require('./EventHandlers/ItemAddition/ItemAddition'),
    require('./EventHandlers/ItemBrowsing/ItemBrowsing'),
    require('./EventHandlers/ItemRemoval/ItemRemoval'),
    require('./EventHandlers/ItemRetrieval/ItemRetrieval'),
    require('./EventHandlers/ItemDistance/ItemDistance'),
    require('./EventHandlers/ItemUpdate/ItemUpdate'),
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
