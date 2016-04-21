var Error  = require("sequelize").ValidationError
require('./Database/Database').sync({force: true})
.then(function(database) {
    var SocketIOServer = require('socket.io')()
    var MainEventHandler = require('./MainEventHandler')
    MainEventHandler.bindEvents(SocketIOServer, database, Error)
    SocketIOServer.listen(3000)
    console.log('Server is now listening on *:3000')
})
