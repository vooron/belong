
class Chank {

	static get CHANK_W() {
		return 30;
	}

	static get CHANK_H() {
		return 30;
	}

	constructor(options) {

		this.terrain = options.terrain;

		// TODO: add default sprite
		this.bg = this.terrain.bg;
	}

	draw(coordinates, options) {
		this._drawBg(coordinates);
	}


	_drawBg(coordinates) {
		this.bg.draw(...coordinates.getPixelCoordinates(), Chank.CHANK_W, Chank.CHANK_H);
	}
}