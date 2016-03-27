var User = require("./Model/ModelFactory").user

module.exports = function(io) {
	io.on("connection", function (socket){
		socket.on("registerUser", function(newUserData) {
			User.create({
				name: newUserData["name"],
				email: newUserData["email"],
				password: newUserData["password"]
			}).then(function(createdUser) {
				socket.emit("userCreatedSuccessfully", createdUser)
			})
		})


		socket.on("performLogin", function(userCredentials) {
			console.log(userCredentials)
			User.findOne({
			 	where: {
					email: userCredentials.email,
					password: userCredentials.password
				}
			}).then(function(user) {
  				if(user) {
  					socket.emit("loginSuccess", user.get())
  				}
			})
		})
	})
}