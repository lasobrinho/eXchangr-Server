var events = require('./ItemAdditionEvents')

module.exports = {
    bindEvents: function(socket, database) {
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
                            responseCode: 0,
                            item: item
                        })
                    }).catch(function(error) {
                        console.log(error.message)
                    })
                } else {
                    console.log('User does not exist')
                }
            }).catch(function(error) {
                console.log(error.message)
            })
        })
    }
}
