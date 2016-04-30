var events = require('./ReactEvents')

module.exports = {
    bindEvents: function(socket, database, responseCodes, Error) {
        var Item = database.models.item
        var User = database.models.user
        var Reaction = database.models.reaction

        socket.on(events.in, function(data) {
            Reaction.create({
                interested: data.reaction.interested,
                userId: data.user.id,
                itemId: data.item.id
            }).then(function(item) {
                socket.emit(events.out, {
                    responseCode: responseCodes.success
                })
            }).catch(function(error) {
                socket.emit(events.out, {
                    responseCode: responseCodes.internalError,
                    message: error.message
                })
            })
        })
    }
}
