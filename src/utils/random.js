

class Random {

	// @returns `true` with passed probability @param `p` є [0, 1] (default 0.5) else `false`;
	static getBool(p) {
		p = p || 0.5;
		p = Random._cutToInterval(p, 0, 1);

		// lowwer ( `<`, but not `<=` ), because Math.random returns values in range [0, 1), not [0, 1].
		return Math.random() < p;
	}


	// @returns integer in range;
	static getIntInRange(from, to) {

		to = Math.floor(to);
		from = Math.ceil(from);

		const radius = to - from;

		return Math.floor(Math.random() * (radius + 1)) + from;
	}


	
	// // @returns integer in range by specified distribution (defaul = uniform);
	// static getIntInRangeByDistribution(from, to, distributionParams) {

	// 	// distribution params passed by user or default uniformDistribution with params `from` = 0, `to` = 1
	// 	distributionParams.distribution = distributionParams.distribution || Random.uniformDistribution;
	// 	distributionParams.params = distributionParams.params || [0, 1];

	// 	to = Math.floor(to);
	// 	from = Math.ceil(from);

	// 	const radius = to - from;

	// 	console.log(Random.getNumInRangeByDistribution(0, 1, distributionParams) * (radius + 1));

	// 	return Math.floor(Random.getNumInRangeByDistribution(0, 1, distributionParams) * (radius + 1)) + from;
	// }


	// // @warning generates values in cycle, so can produce an infinite loop!
	// // @param distributionParams is a {distribution: ..., params: [...]};
	// // @returns a random value by distribution in range without changing qualities
	// static getNumInRangeByDistribution(from, to, distributionParams) {

	// 	const distribution = distributionParams.distribution || Random.uniformDistribution;
	// 	const params = distributionParams.params || [];

	// 	let value = null;

	// 	while (value < from || value > to) {
	// 		value = distribution(...params);
	// 	}

	// 	return value;
	// }


	// @returns an array member by random index between @param `from` and @param `to`
	static getFromArray(arr, from, to) {
		from = from || 0;
		to = to || arr.length - 1;

		from = Random._cutToInterval(from, 0, arr.length - 1);
		to = Random._cutToInterval(to, 0, arr.length - 1);

		return arr[Random.getIntInRange(from, to)];
	}


	static _cutToInterval (val, min, max) {
		if (val < min) {
			return min;
		} else if (val > max) {
			return max;
		}
		return val;
	}


	static gaussianDistribution(mu, sigma) {

		// Box-Muller method
		const u1 = Random.uniformDistribution(0, 1);	
		const u2 = Random.uniformDistribution(0, 1);

		// we can generate 2 random number, but second is unnecessery
		let z1 = Math.sqrt(-2.0*Math.log(u1)) * Math.cos(2*Math.PI*u2);
		// let z2 = Math.sqrt(-2.0*Math.log(u1)) * Math.sin(2*Math.pi*u2)

		return mu + sigma*z1;
	}


	static uniformDistribution(a, b) {
		return Math.random() * (b - a) + a;
	}
}
