

// doesnt work with NuN
function hasSubArray(arr1, arr2) {

	// if (arr1.length !== arr2.length) {
	// 	return false;
	// }

	let arr1Entries = {};

	for (let element of arr1) {
		if (arr1Entries[element]) {
			arr1Entries[element]++;
		} else {
			arr1Entries[element] = 1;
		}
	}

	let arr2Entries = {};

	for (let element of arr2) {
		if (arr2Entries[element]) {
			arr2Entries[element]++;
		} else {
			arr2Entries[element] = 1;
		}
	}

	for (let key in arr2Entries) {

		if (!arr1Entries[key] || arr2Entries[key] !== arr1Entries[key]) {
			return false;
		}
	}

	return true;
}




// shift interval with specified center to specific position to locate it in bounds without cutting if it`s real;
function fitIntervalToBoundsWithShift(center, interval, min, max) {
	const distance = max - min;

	if (interval > distance) {
		return [min, max];
	}

	const maxIntervalBound = center + interval/2;
	const minIntervalBound = center - interval/2;

	if (maxIntervalBound > max) {
		const shift = maxIntervalBound - max;
		center -= shift;
	} else if(minIntervalBound < min) {
		const shift = min - minIntervalBound;
		center += shift;
	}

	return [center - interval/2, center + interval/2]
}



// ... first: checked, second: left bound, third: right bound ...
function isInBounds(...args) {

	if (args.length % 3 != 0) {
		throw ("Illegal arguments");
	}

	for (let i = 0; i < args.length; i += 3) {
		if (args[i] < args[i+1] || args[i] > args[i+2]) {
			return false;
		}
	}

	return true;
}

