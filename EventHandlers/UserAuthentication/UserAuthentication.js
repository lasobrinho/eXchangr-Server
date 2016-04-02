events = require('./userAuthenticationEvents')

module.exports = {
    bindEvents: function(socket, database) {
        var User = database.models.user
        socket.on(events.in, function(data) {
            User.find({
                where: {
                    email: data.credentials.email,
                    password: data.credentials.password
                }
            }).then(function(user) {
                if (user) {
                    socket.emit(events.out, {
                        responseCode: 0,
                        user: user
                    })
                } else {
                    socket.emit(events.out, {
                        responseCode: 2,
                        message: 'Wrong Credentials'
                    })
                }
            }).catch(function(error) {
                socket.emit(events.out, {
                    responseCode: 1,
                    message: error.message
                })
            })
        })
    }
}
