var events = require('./ItemRetrievalEvents')

module.exports = {
    bindEvents: function(socket, database, responseCodes, Error) {
        var User = database.models.user
        socket.on(events.in, function(data) {
            User.findById(data.user.id).then(function(user) {
                if (user != null) {
                    user.getItems({
                        include: database.models.picture
                    }).then(function(userItems) {
                        var result = []
                        userItems.forEach(function(userItem) {
                            result.push(userItem.get({plain: true}))
                        })
                        socket.emit(events.out, {
                            responseCode: responseCodes.success,
                            items: result
                        })
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
