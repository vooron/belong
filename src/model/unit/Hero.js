class Hero extends Unit {

	constructor(coordinates, view) {

		const options = {
			hp: 20,
			lifeTime: Unit.STAT_INFINITY,
			body: new RoundBody(10, coordinates)
		};

		super(coordinates, view, options);


		this.blockedActions = {
			leftMovement: false,
			rightMovement: false,
			upMovement: false,
			downMovement: false
		};


		this.speed = 5;
		this.direction = Direction.DOWN;


		this.pressedKeys = new Set();

		this.speedEffect = false;
	}

	draw (coordinatesInScreen) {
		super.draw(coordinatesInScreen);
	}

	moveLeft() {

		if (this.blockedActions.leftMovement) {
			this.blockedActions.leftMovement = false;
			return;
		}


		let speed = this.speed;

		if (this.speedEffect) {
			speed = this.speedEffect(speed);
			this.speedEffect = false;
		}

		this.view.moveLeft({skip: 20 / this.speed});
		this.coordinates.changeXToWithChecking(-speed, this.view.w, (mapW - 2) * Chank.CHANK_W);
	}

	moveRight() {

		if (this.blockedActions.rightMovement) {
			this.blockedActions.rightMovement = false;
			return;
		}


		let speed = this.speed;

		if (this.speedEffect) {
			speed = this.speedEffect(speed);
			this.speedEffect = false;
		}

		this.view.moveRight({skip: 20 / this.speed});
		this.coordinates.changeXToWithChecking(speed, this.view.w, (mapW - 2) * Chank.CHANK_W);
	}

	moveUp() {

		if (this.blockedActions.upMovement) {
			this.blockedActions.upMovement = false;
			return;
		}


		let speed = this.speed;

		if (this.speedEffect) {
			speed = this.speedEffect(speed);
			this.speedEffect = false;
		}

		this.view.moveUp({skip: 20 / this.speed});
		this.coordinates.changeYToWithChecking(-speed, this.view.h + Chank.CHANK_H, (mapH - 2)* Chank.CHANK_H);
	}

	moveDown() {

		if (this.blockedActions.downMovement) {
			this.blockedActions.downMovement = false;
			return;
		}


		let speed = this.speed;

		if (this.speedEffect) {
			speed = this.speedEffect(speed);
			this.speedEffect = false;
		}

		this.view.moveDown({skip: 20 / this.speed});
		this.coordinates.changeYToWithChecking(speed, this.view.h + Chank.CHANK_H, (mapH - 2) * Chank.CHANK_H);
	}

	moveUpRight() {
	}

	moveRightDown() {

	}

	moveDownLeft() {

	}

	moveLeftUp() {

	}

	stayLeft() {
		this.view.stayLeft();
	}

	stayRight() {
		this.view.stayRight();
	}

	stayUp() {
		this.view.stayUp();
	}

	stayDown() {
		this.view.stayDown();
	}
}