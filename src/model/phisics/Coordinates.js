class Coordinates {
	constructor(x, y) { // set in pixels
		this.x = x;
		this.y = y;
	}

	getPixelCoordinates() {
		return [this.x, this.y];
	}

	getXPixels() {
		return this.x;
	}

	getYPixels() {
		return this.y;
	}

	getXChanks() {
		return Math.floor(this.x/Chank.CHANK_W);
	}

	getYChanks() {
		return  Math.floor(this.y/Chank.CHANK_H);
	}


	changeXTo(n) {
		this.x += n;
	}

	changeXToWithChecking(n, min, max) {
		if (this.x + n < min) {
			this.x = min;
		} else if (this.x + n > max) {
			this.x = max;
		} else {
			this.x += n;
		}
	}

	changeYToWithChecking(n, min, max) {
		if (this.y + n < min) {
			this.y = min;
		} else if (this.y + n > max) {
			this.y = max;
		} else {
			this.y += n;
		}
	}

	static xChanksToPixels(x) {
		return x * Chank.CHANK_W;
	}

	static xPixelToChanks(x) {
		// return x / Chank.CHANK_W;
		return Math.floor(x / Chank.CHANK_W);
	}

	static yChanksToPixels(y) {
		return y * Chank.CHANK_H;
	}

	static yPixelToChanks(y) {
		// return y / Chank.CHANK_H;
		return Math.floor(y / Chank.CHANK_H);
	}

	getChanksCoordinates() {
		return [this.getXChanks(), this.getYChanks()];
	}

	static inPixels(x, y) {
		return new Coordinates(x, y);
	}

	static inChanks(x, y) {
		return new Coordinates(x*Chank.CHANK_W, y*Chank.CHANK_H);
	}

}