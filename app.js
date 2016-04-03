require('./Database/Database').sync()
.then(function(database) {
    var SocketIOServer = require('socket.io')()
    var MainEventHandler = require('./MainEventHandler')
    MainEventHandler.bindEvents(SocketIOServer, database)
    SocketIOServer.listen(3000)
    console.log('Server is now listening on *:3000')
})
