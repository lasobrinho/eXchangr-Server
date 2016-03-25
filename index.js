var ModelFactory = require("./Model/ModelFactory")
var SocketIO = require("socket.io")()
var eventHandler = require("./EventHandler")

eventHandler(SocketIO)

SocketIO.listen(3000)
console.log("Server is now listening on *:3000")