
class UserControlManager {

	constructor(keymap, checkInterval) {


		checkInterval = checkInterval || 40;

		this.keymap = keymap;

		this.pressedKeys = new Set();

		this.activeBindings = new Set();

		window.onkeydown = (e) => {
			var key = e.keyCode ? e.keyCode : e.which;
			this.pressedKeys.add(key);
		}

		window.onkeyup = (e) => {
			var key = e.keyCode ? e.keyCode : e.which;
			this.pressedKeys.delete(key);

			for (let binding of this.activeBindings) {

				if (this.keymap[binding].keyCodes.find((el) => {return el == key})) {

					this.activeBindings.delete(binding);

					if (this.keymap[binding].onUp) {
						this.keymap[binding].onUp();
					}

				}
			}

		}


		setInterval(() => { this.executePressed() }, checkInterval);
	}


	filterKeyBindings() {

		let maxLenght = 0;

		for (let binding of this.activeBindings) {

			let data = this.keymap[binding];

			if (maxLenght < data.keyCodes.length) {
				maxLenght = data.keyCodes.length;
			}
		}


		for (let binding of this.activeBindings) {
			let data = this.keymap[binding];

			if (maxLenght > data.keyCodes.length) {
				this.activeBindings.delete(binding);
			}
		}	

	}


	executePressed() {
		for (let key in this.keymap) {
			let data = this.keymap[key];

			if (hasSubArray(this.pressedKeys, data.keyCodes)) {
				this.activeBindings.add(key);
			}
		}

		this.filterKeyBindings();

		for (let binding of this.activeBindings) {
			if (this.keymap[binding].onPressed) {
				this.keymap[binding].onPressed();
			}
		}
	}
}