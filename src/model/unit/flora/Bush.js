class Bush extends Unit {

	constructor(coordinates, view) {

		const options = {
			hp: 10,
			lifeTime: Unit.STAT_INFINITY,
			body: new RoundBody(20, coordinates)
		};

		super(coordinates, view, options);
	}

	draw (coordinatesInScreen) {
		super.draw(coordinatesInScreen);
	}


	onCollision(unit) {
		unit.speedEffect = (speed) => {return speed - 3};
	}
}
