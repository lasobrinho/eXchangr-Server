var events = require('./ItemRemovalEvents')

module.exports = {
    bindEvents: function(socket, database, responseCodes, Error) {
        var User = database.models.user
        var Item = database.models.item
        socket.on(events.in, function(data) {
            User.findById(data.user.id).then(function(user) {
                if (user != null) {
                    Item.findById(data.item.id).then(function(toDeleteItem) {
                        if (toDeleteItem != null) {
                            toDeleteItem.destroy().then(function() {
                                socket.emit(events.out, {
                                    responseCode: responseCodes.success
                                })
                            })
                        } else {
                            throw Error("Could not find item")
                        }
                    })
                } else {
                    socket.emit(events.out, {
                        responseCode: responseCodes.permissionDenied,
                        message: "Permission Denied"
                    })
                }
            }).catch(function(error) {
                socket.emit(events.out, {
                    responseCode: responseCodes.internalError,
                    message: error.message
                })
            })
        })
    }
}
