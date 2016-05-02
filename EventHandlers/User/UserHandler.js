var handlers = [
	require('./UserRegistration/UserRegistration'),
    require('./UserAuthentication/UserAuthentication'),
    require('./UserCoordinates/UserCoordinates'),
    require('./UpdateCoordinate/UpdateUserCoordinate')
]

module.exports = {
	bindEvents: function(socket, database, responseCodes, Error) {
		handlers.forEach(function(handler) {
			handler.bindEvents(socket, database, responseCodes, Error)
		})
	}
}