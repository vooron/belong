class Unit {
	static get STAT_INFINITY() {
		return false;
	}

	constructor(coordinates, view, options) {

		this.coordinates = coordinates;
		this.view = view;

		this.body = options.body;

		// if faulse - infinity
		this.lifeTime = options.lifeTime || Unit.STAT_INFINITY;
		this.hp = options.hp || Unit.STAT_INFINITY;

		this.loot = options.loot || [];
	}


	draw(coordinatesInScreen) {
		this.view.draw(...coordinatesInScreen.getPixelCoordinates());
	}

	onCollision(unit) {

	}
	// TODO: define the rules, that control loot drops
}
