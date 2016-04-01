module.exports = {
    bindEvents: function(socket, database) {
        var User = database.models.user
        socket.on('userAuthentication', function(data) {
            User.find({
                where: {
                    email: data.credentials.email,
                    password: data.credentials.password
                }
            }).then(function(user) {
                if (user) {
                    socket.emit('userAuthenticationResponse', {
                        responseCode: 0,
                        user: user
                    })
                } else {
                    socket.emit('userAuthenticationResponse', {
                        responseCode: 2,
                        message: "Wrong Credentials"
                    })
                }
            }).catch(function(error) {
                socket.emit('userAuthenticationResponse', {
                    responseCode: 1,
                    message: error.message
                })
            })
        })
    }
}
