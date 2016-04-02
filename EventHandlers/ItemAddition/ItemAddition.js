module.exports = {
    bindEvents: function(socket, database) {
        var Item = database.models.item
        socket.on('itemAddition', function(data) {
            
        })
    }
}
