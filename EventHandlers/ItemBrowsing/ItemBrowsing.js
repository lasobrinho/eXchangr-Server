var events = require('./ItemBrowsingEvents')

module.exports = {
    bindEvents: function(socket, database, responseCodes, Error) {
        var User = database.models.user
        var Coordinates = database.models.coordinates
        var Item = database.models.item
        var Picture = database.models.picture
        var Reaction = database.models.reaction

        socket.on(events.in, function(data) {
            User.findById(data.user.id, {
                include: Coordinates
            }).then(function(user) {
                Item.findAll({  
                    include: [
                        {
                            model: Reaction,
                            required:  false
                        },
                        {
                            model: Picture
                        }
                    ],
                    where: {
                        userId: {
                            $ne: data.user.id
                        }
                    }
                }).then(function(desiredItems) {
                    var items = []
                    desiredItems.forEach(function(desiredItem) {
                        var desired = true
                        for (var i=0; i < desiredItem.reactions.length; i++) {
                            if (desiredItem.reactions[i].userId == user.id) {
                                desired = false
                                break
                            }
                        }
                        items.push(desiredItem.get({plain: true}))
                    })
                    socket.emit(events.out, items)
                })
            }).catch(function(error) {
                console.log(error.message)
            })
        })
    }
}
