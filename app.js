require("./Database/Database").sync({
    force: true,
    log: console.log
}).then(function(database) {
    var SocketIOServer = require("socket.io")()
    var EventHandler = require("./EventHandler")
    EventHandler.bindEvents(SocketIOServer, database)
    SocketIOServer.listen(3000)
    console.log("Server is now listening on *:3000")
})
