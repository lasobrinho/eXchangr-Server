var events = require('./ItemUpdateEvents')

module.exports = {
    bindEvents: function(socket, database, responseCodes, Error) {
        var User = database.models.user
        var Item = database.models.item
        var Picture = database.models.picture

        socket.on(events.in, function(data) {
            User.findById(data.user.id).then(function(user) {
                if (user != null) {
                    Item.findById(data.item.id).then(function(itemToUpdate) {
                        if (itemToUpdate != null) {
                            itemToUpdate.update({
                                name: data.item.name,
                                description: data.item.description,
                                active: data.item.active
                            }).then(function(updatedItem) {
                                updatedItem.getPictures().then(function(pictures) {
                                    pictures.forEach(function(picture) {
                                        picture.destroy()
                                    })

                                    var newPictures = []

                                    data.item.pictures.forEach(function(picture) {
                                        var newPicture = {bytes: picture.bytes, itemId: updatedItem.get().id}
                                        newPictures.push(newPicture)
                                    })
                                    console.log(newPictures.length)

                                    Picture.bulkCreate(newPictures).then(function() {
                                        socket.emit(events.out, {
                                            responseCode: 0
                                        })
                                    })
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
