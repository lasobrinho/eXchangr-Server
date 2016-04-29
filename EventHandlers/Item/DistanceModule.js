var earth_radius_in_km = 6371
var earth_radius_in_miles = 3959

function calculateDistance(coordinate1, coordinate2, R) {
	    var fi_1 = coordinate1.latitude * Math.PI/180
	    var fi_2 = coordinate2.latitude *  Math.PI/180
	    var delta_fi_ = (coordinate2.latitude-coordinate1.latitude) * Math.PI/180
	    var delta_epsilon = (coordinate2.longitude-coordinate1.longitude) * Math.PI/180

	    var a = Math.sin(delta_fi_/2) * Math.sin(delta_fi_/2) + Math.cos(fi_1) * Math.cos(fi_2) * Math.sin(delta_epsilon/2) * Math.sin(delta_epsilon/2)
	    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
	    
	    var d = R * c
	    return Math.round(d * 100) / 100
	}


module.exports = {
	distanceInMiles: function(coordinate1, coordinate2) {
		return calculateDistance(coordinate1, coordinate2, earth_radius_in_miles)
	},
	distanceInKilometers: function(coordinate1, coordinate2) {
		return calculateDistance(coordinate1, coordinate2, earth_radius_in_km)
	}
}