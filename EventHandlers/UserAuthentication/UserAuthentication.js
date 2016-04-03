var events = require('./userAuthenticationEvents')

module.exports = {
    bindEvents: function(socket, database, responseCodes) {
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
                        responseCode: responseCodes.success,
                        user: user.get({
                            plain: true
                        })
                    })
                } else {
                    socket.emit(events.out, {
                        responseCode: responseCodes.permissionDenied,
                        message: 'Wrong Credentials.'
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
