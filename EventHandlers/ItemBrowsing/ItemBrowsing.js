var events = require('./ItemBrowsingEvents')

module.exports = {
    bindEvents: function(socket, database, responseCodes, Error) {
        var User = database.models.user
        var Coordinates = database.models.coordinates
        var Item = database.models.item
        var Picture = database.models.picture
        var Reaction = database.models.reaction
        socket.on(events.in, function(data) {
            var auth_user = null
            User.findById(data.user.id, {
                include: Coordinates
            }).then(function(user) {
                auth_user = user
                Item.findAll({  
                    include: [
                        {
                            model: Reaction,
                            required:  false,
                        },
                        {
                            model: Picture
                        },
                        {
                            model: User,
                            attributes: ['id'],
                            include: [{
                                model: Coordinates,
                                attributes: ['latitude', 'longitude']
                            }]
                        }
                    ],
                    where: {
                        $and: [
                            {
                                userId: {
                                    $ne: data.user.id
                                }
                            },
                            {
                                '$reactions.userId$': {
                                    $ne: data.user.id
                                }
                            }
                        ]
                    }
                }).then(function(eligibleItems) {
                    socket.emit(events.out, {
                        items: eligibleItems,
                        responseCode: responseCodes.success
                    })
                })
            }).catch(function(error) {
                console.log(error.message)
            })
        })
    }
}
