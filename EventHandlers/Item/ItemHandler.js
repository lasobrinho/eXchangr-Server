var handlers = [
	require('./ItemAddition/ItemAddition'),
    require('./ItemBrowsing/ItemBrowsing'),
    require('./ItemRemoval/ItemRemoval'),
    require('./ItemRetrieval/ItemRetrieval'),
    require('./ItemDistance/ItemDistance'),
    require('./ItemUpdate/ItemUpdate')
]

module.exports = {
	bindEvents: function(socket, database, responseCodes, Error) {
		handlers.forEach(function(handler) {
			handler.bindEvents(socket, database, responseCodes, Error)
		})
	}
}