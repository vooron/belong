class VariativeAnimatedSprite extends VariativeSprite {

	static get MODE_CYCLED_REPEAD() {
		return 0;
	}

	static get MODE_PLAY_ONCE() {
		return 1;
	}

	constructor(image, options) {
		super(image, options);

		this.defaultSkip = options.defaultSkip || 0;
	}

	animate(frames, options) {

		if (this.frames === frames) {

			this.skip--;

			if (this.skip > 0) {
				return;
			} else {
				this.skip = options.skip || this.defaultSkip;
			}

			this.step++;

		} else {
			this.step = 0;
			this.frames = frames;
		}


		// switch, because it can grow and become more complex
		switch (options.mode) {
			case VariativeAnimatedSprite.MODE_CYCLED_REPEAD:
				this.cycledRepead(options);
				break;
			default:
				this.playOnce(options);
				break;
		}

	}

	cycledRepead(options) {
		if (this.step >= this.frames.length) {
			this.step = 0;
		}

		this.activeVariant = this.frames[this.step];
	}

	playOnce(options) {

		if (this.step >= this.frames.length) {	
			this.activeVariant = options.lastFrame || 0;
			return;
		}

		this.activeVariant = this.frames[this.step];
	}
}