var events = require('./ItemUpdateEvents')

module.exports = {
    bindEvents: function(socket, database, responseCodes, Error) {
        var User = database.models.user
        var Item = database.models.item
        var Picture = database.models.item
        socket.on(events.in, function(data) {
            User.findById(data.user.id).then(function(user) {
                if (user != null) {
                    Item.findById(data.item.id).then(function(item) {
                        if (item != null) {
                            item.update({
                                name: data.item.name,
                                description: data.item.description,
                                active: data.item.active
                            }).then(function() {
                                item.getPictures().then(function(pictures) {
                                    pictures.forEach(function(picture) {
                                        picture.destroy()
                                    })

                                    data.item.pictures.forEach(function(picture) {
                                        Picture.create(picture).then(function(newPicture) {
                                            item.addPicture(newPicture)
                                        })
                                    })
                                })
                            }).then(function() {
                                emit(events.out, {
                                    responseCode: 0
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
