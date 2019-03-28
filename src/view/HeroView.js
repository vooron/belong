class HeroView extends VariativeAnimatedSprite {
	constructor(image, options) {

		super(image, options);

		this.actions = {
			moveDown: [0, 1, 2, 3],
			moveLeft: [4, 5, 6, 7],
			moveRight: [8, 9, 10, 11],
			moveUp: [12, 13, 14, 15],
			stayDown: [0],
			stayLeft: [4],
			stayRight: [8],
			stayUp: [12]
		};
	}

	moveLeft(options) {

		options = options || {};

		options.mode = VariativeAnimatedSprite.MODE_CYCLED_REPEAD;
		this.animate(this.actions['moveLeft'], options);
	}

	moveRight(options) {

		options = options || {};

		options.mode = VariativeAnimatedSprite.MODE_CYCLED_REPEAD;
		this.animate(this.actions['moveRight'], options);
	}

	moveUp(options) {

		options = options || {};

		options.mode = VariativeAnimatedSprite.MODE_CYCLED_REPEAD;
		this.animate(this.actions['moveUp'], options);
	}

	moveDown(options) {

		options = options || {};
		
		options.mode = VariativeAnimatedSprite.MODE_CYCLED_REPEAD;
		this.animate(this.actions['moveDown'], options);
	}

	stayUp(options) {
		options = options || {};
		this.animate(this.actions['stayUp'], options);
	}

	stayDown(options) {
		options = options || {};
		this.animate(this.actions['stayDown'], options);
	}

	stayLeft(options) {
		options = options || {};
		this.animate(this.actions['stayLeft'], options);
	}

	stayRight(options) {
		options = options || {};
		this.animate(this.actions['stayRight'], options);
	}

}