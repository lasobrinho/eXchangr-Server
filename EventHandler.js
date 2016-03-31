module.exports = {
	bindEvents: function(server, database) {
		server.on("connection", function(socket) {
			console.log("New connection")
		})
	}
}
