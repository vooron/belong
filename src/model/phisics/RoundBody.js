class RoundBody {
	constructor(radius, coordinates) {
		this.r = radius;
		this.coordinates = coordinates;
	}

	isInBounds(checkedCoordinares) {
		const verticalCathetus = Math.abs(this.coordinates.getYPixels() - this.r/2 - checkedCoordinares.getYPixels());
		const horizontalCathetus = Math.abs(this.coordinates.getXPixels() - checkedCoordinares.getXPixels());

		const distance = Math.sqrt( verticalCathetus**2 + horizontalCathetus**2 );

		return distance < this.r;
	}

	isInCollision(body) {

		if (body instanceof RoundBody) {

			const verticalCathetus = Math.abs(this.coordinates.getYPixels() - this.r/2  - body.coordinates.getYPixels());
			const horizontalCathetus = Math.abs(this.coordinates.getXPixels() - body.coordinates.getXPixels());

			const distance = Math.sqrt( verticalCathetus**2 + horizontalCathetus**2 );

			return distance < body.r + this.r;
		}
	}
}







// class ImpassableRoundBody extends RoundBody {

// 	constructor(radius, coordinates) {
// 		super(radius, coordinates);
// 	}

// 	onCollision(unit) {
// 		if (unit.coordinates.getYPixels() < this.coordinates.getYPixels()) {
// 			unit.blockedActions.rightMovement = true;
// 		}

// 		if (unit.coordinates.getYPixels() > this.coordinates.getYPixels()) {
// 			unit.blockedActions.leftMovement = true;
// 		}

// 		if (unit.coordinates.getXPixels() < this.coordinates.getXPixels()) {
// 			unit.blockedActions.downMovement = true;
// 		}

// 		if (unit.coordinates.getXPixels() > this.coordinates.getXPixels()) {
// 			unit.blockedActions.upMovement = true;
// 		}
// 	}
// }
