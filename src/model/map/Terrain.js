
class Terrain {
	constructor(options) {

		this.coordinates = options.coordinates || Coordinates.inPixels(0, 0);

		this.name = options.name || "undefined";

		// meassures in chanks
		this.area = options.area;

		// TODO: add default sprite
		this.bg = options.bg;

		// pattern 
		// key: {min: n, max: m, spownTime: sec, unitFactory: function(x, y)}
		this.floraDescr = options.floraDescr || {};
		this.faunaDescr = options.faunaDescr || {};

		this.flora = {};
		this.fauna = {};
	}
}