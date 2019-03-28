class Sprite {	// view
	constructor(image, options) {

		options = options || {};

		this.ctx = ctxProviderFactory()();

		this.x = options.x || 0;
		this.y = options.y || 0;

		this.h = options.h || image.height;
		this.w = options.w || image.width;

		this.image = image;
	}


	draw(x, y, w, h) {

		w = w || this.w;
		h = h || this.h;

		this.ctx.drawImage(	// move center from top-left to bottom-center
			this.image,
			this.x,
			this.y,
			this.w,
			this.h,
			x - w / 2,
			y - h,
			w,
			h
		);

	}
}