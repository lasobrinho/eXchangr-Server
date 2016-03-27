var Events = require("./CommunicationAPI/Events")
var User = require("./Model/ModelFactory").user


var ServerEvents = Events.ServerEvents
var ClientEvents = Events.ClientEvents

module.exports = function(io) {
	io.on(Events.connection, function (socket){

		socket.on(ClientEvents.PerformUserRegistration, function(newUserData) {
			User.findOne({where: {email: newUserData["email"]}}).then(function(existingUser) {
				if(!existingUser) {
					User.create({
						name: newUserData.name,
						email: newUserData.email,
						password: newUserData.password
					}).then(function(createdUser) {
						if(createdUser) {
							socket.emit(ServerEvents.UserRegistrationResponse, {
								responseCode: 1, //success
								user: createdUser
							})
						}
					})
				} else {
					socket.emit(ServerEvents.UserRegistrationResponse, {
						responseCode: 0, //failure
						failureReason: "User already exists"
					})
				}
			})
		})


		socket.on(ClientEvents.PerformUserLogin, function(userCredentials) {
			User.findOne({
			 	where: {
					email: userCredentials.email,
					password: userCredentials.password
				}
			}).then(function(user) {
  				if(user) {
  					socket.emit(ServerEvents.UserLoginResponse, {
  						responseCode: 1, //success
  						user: user.get()
  					})
  				} else {
  					socket.emit(ServerEvents.UserLoginResponse, {
  						responseCode: 0, //failure
  						failureReason: "Wrong credentials"
  					})
  				}
			})
		})
	})
}