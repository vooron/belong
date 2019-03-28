// For objects, that can change their state (change sprite variant)
class VariativeSprite extends Sprite {
	constructor(image, options) {
		super(image, options);

		options = options || {};

		this.hVars = options.hVars || 1;
		this.vVars = options.vVars || 1;

		this.h = options.h || image.height / this.hVars;
		this.w = options.w || image.width / this.vVars;

		this.variants = [];

		this._parceVariants();

		this.activeVariant = options.activeVariant || 0; // index of active variant;
	}

	_parceVariants() {
		for (let i = 0; i < this.hVars; i++) {
			for (let j = 0; j < this.vVars; j++) {
				this.variants.push({
					x: this.x + j*this.w,
					y: this.y + i*this.h,
					w: this.w,
					h: this.h,
					image: this.image
				});
			}
		}
	}

	addVariant(x, y, w, h, image) {
		this.variants.push({
			x: x,
			y: y,
			w: w,
			h: h,
			image: image || this.image
		});
	}


	draw(x, y, w, h) {

		w = w || this.w;
		h = h || this.h;

		const variant = this.variants[this.activeVariant];

		this.ctx.drawImage(
			variant.image,
			variant.x, 
			variant.y,
			variant.w, 
			variant.h, 
			x - w / 2, // change center of figure from top-left to bottom-center
			y - h,
			w,
			h
		);

	}
}