var handlers = [
	require('./UserRegistration/UserRegistration'),
    require('./UserAuthentication/UserAuthentication'),
]

module.exports = {
	bindEvents: function(socket, database, responseCodes, Error) {
		handlers.forEach(function(handler) {
			handler.bindEvents(socket, database, responseCodes, Error)
		})
	}
}