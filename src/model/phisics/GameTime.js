class GameTime {

	static get TIME_RELATION() {
		// 1 real second is 100 game seconds;
		return 1/100;
	}

	static seconds(n) {
		return 1000 * n;
	}

	static minutes(n) {
		return 1000 * 60 * n;
	}

	static hours(n) {
		return 1000 * 60 * 60 * n;
	}


	static gameSeconds(n) {
		return GameTime.TIME_RELATION * GameTime.seconds(n);
	}

	static gameMinutes(n) {
		return GameTime.TIME_RELATION * GameTime.minutes(n);
	}

	static gameHours(n) {
		return GameTime.TIME_RELATION * GameTime.hours(n);
	}

	static gameDays(n) {
		return GameTime.TIME_RELATION * GameTime.hours(24) * n;
	}
}