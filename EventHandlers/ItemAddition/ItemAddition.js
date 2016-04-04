var events = require('./ItemAdditionEvents')

module.exports = {
    bindEvents: function(socket, database, responseCodes, Error) {
        var Item = database.models.item
        var Picture = database.models.picture

        socket.on(events.in, function(data) {
            Item.create({
                name: data.item.name,
                description: data.item.description,
                active: data.item.active,
                userId: data.user.id,
                pictures: data.item.pictures
            }, {
                include: Picture
            }).then(function(item) {
                socket.emit(events.out, {
                    responseCode: responseCodes.success,
                    item: item.get({
                        plain: true
                    })
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
