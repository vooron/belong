
class Tree extends Unit {
	constructor(coordinates, view) {

		const options = {
			hp: 40,
			lifeTime: Unit.STAT_INFINITY,
			body: new RoundBody(15, coordinates)
		};

		super(coordinates, view, options);
	}

	draw (coordinatesInScreen) {
		super.draw(coordinatesInScreen);
	}

	onCollision(unit) {
		// this.body.onCollision(unit);
	}
}