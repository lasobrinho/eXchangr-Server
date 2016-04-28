var ResponseCodes = require('./ResponseCodes')

var UserRegistration = require('./EventHandlers/UserRegistration/UserRegistration')
var UserAuthentication = require('./EventHandlers/UserAuthentication/UserAuthentication')
var ItemAddition = require('./EventHandlers/ItemAddition/ItemAddition')
var ItemBrowsing = require('./EventHandlers/ItemBrowsing/ItemBrowsing')
var ItemRemoval = require('./EventHandlers/ItemRemoval/ItemRemoval')
var ItemRetrieval = require('./EventHandlers/ItemRetrieval/ItemRetrieval')
var ItemDistance = require('./EventHandlers/ItemDistance/ItemDistance')

module.exports = {
    bindEvents: function(server, database, Error) {
        server.on('connection', function(socket) {
			UserRegistration.bindEvents(socket, database, ResponseCodes, Error)
            UserAuthentication.bindEvents(socket, database, ResponseCodes, Error)
            ItemAddition.bindEvents(socket, database, ResponseCodes, Error)
            ItemBrowsing.bindEvents(socket, database, ResponseCodes, Error)
            ItemRemoval.bindEvents(socket, database, ResponseCodes, Error)
            ItemRetrieval.bindEvents(socket, database, ResponseCodes, Error)
            ItemDistance.bindEvents(socket, database, ResponseCodes, Error)
        })
    }
}
