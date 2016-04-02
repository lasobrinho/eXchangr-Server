var events = require('./UserRegistrationEvents')

module.exports = {
    bindEvents: function(socket, database) {
        var User = database.models.user
        socket.on(events.in, function(data) {
            User.create({
                name: data.user.name,
                email: data.user.email,
                password: data.user.password
            }).then(function(user) {
                socket.emit(events.out, {
                    responseCode: 0,
                    user: user
                })
            }).catch(function(error) {
                socket.emit(events.out, {
                    responseCode: 1,
                    message: error.message
                })
            })
        })
    }
}
