var events = require('./ItemAdditionEvents')

module.exports = {
    bindEvents: function(socket, database, responseCodes) {
        var Item = database.models.item
        var User = database.models.user
        socket.on(events.in, function(data) {
            User.findById(data.user.id).then(function(user) {
                if(user) {
                    Item.create({
                        name: data.item.name,
                        description: data.item.description,
                        active: data.item.active
                    }).then(function(item) {
                        user.addItem(item)
                        socket.emit(events.out, {
                            responseCode: responseCodes.success,
                            item: item
                        })
                    }).catch(function(error) {
                        socket.emit(events.out, {
                            responseCode: responseCodes.internalError,
                            message: error.message
                        })
                    })
                } else {
                    socket.emit(events.out, {
                        responseCode: responseCodes.internalError,
                        message: 'User does not exist.'
                    })
                }
            }).catch(function(error) {
                socket.emit(events.out, {
                    responseCode: responseCodes.internalError,
                    message: 'Error fetching user.'
                })
            })
        })
    }
}
