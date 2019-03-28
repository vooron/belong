'use strict';

// IDEA: can not to draw map if coordinates not changed
// TODO: draw firstly objects, that have `y` lowwer, then hero and then higher

function ctxProviderFactory() {
	let cnv = document.getElementById('canvas');
	let ctx = cnv.getContext('2d');

	return function() {
		return ctx;
	}
}


function canvasProvider() {
	return document.getElementById('canvas');
}


let map = [

];

const FPS = 30;


const mapH = 90;
const mapW = 90;

let heroCoordinates = Coordinates.inPixels(
	Math.floor(Coordinates.xChanksToPixels(mapW - 1) / 2),
	Math.floor(Coordinates.yChanksToPixels(mapH - 1) / 2)
	);



const hScreenPixelsRadius = Math.ceil(canvasProvider().height / 2) + Chank.CHANK_H;
const vScreenPixelsRadius = Math.ceil(canvasProvider().width / 2) + Chank.CHANK_W;


let grass = new Image();
grass.src = 'media/images/sprites/land/grass.png';

let dessert = new Image();
dessert.src = 'media/images/sprites/land/dessert.png';

let tree = new Image();
tree.src = 'media/images/sprites/flora/tree.png';

let bush = new Image();
bush.src = 'media/images/sprites/flora/bush_4_variants_65pxStep.png';

let heroImage = new Image();
heroImage.src = 'media/images/sprites/heroes/heroGirl_4directional_4varAnimated.png';


heroImage.onload = function() {
	// init views
	let grassSprite = new Sprite(grass);
	let dessertSprite = new Sprite(dessert);
	let treeSprite = new Sprite(tree);

	let heroView = new HeroView(heroImage, {
		hVars: 4,
		vVars: 4
	});

	let hero = new Hero(heroCoordinates, heroView);


	let treeFactory = (coordinates) => {
		return new Tree(coordinates, treeSprite);
	};

	let bushFactory = (coordinates) => {

		const variant = Random.getIntInRange(0, 3);  // 4 variants of bush in 1 sprite
		const step = bush.width / 4;

		return new Bush(coordinates, new Sprite(bush, {
			x: variant * step,
			w: step
		}));
	};


	let terrains = [
	new Terrain({
		coordinates: Coordinates.inChanks(
			Random.getIntInRange(0, mapW - 1),
			Random.getIntInRange(0, mapH - 1)
			),
		area: 600,
		name: 'dessert',
		bg: dessertSprite
	}),
	new Terrain({
		coordinates: Coordinates.inChanks(
			Random.getIntInRange(0, mapW - 1),
			Random.getIntInRange(0, mapH - 1)
			),
		area: 300,
		name: 'forest',
		floraDescr: {
			tree: {min: 15, max: 40, unitFactory: treeFactory },
		},
		bg: grassSprite
	}),
	];


	let defaultTerrain = new Terrain({
		name: 'field',
		floraDescr: {
			tree: {min: 15, max: 40, unitFactory: treeFactory },
			bush: {min: 20, max: 50, unitFactory: bushFactory }
		},
		bg: grassSprite
	});


	map = makeMap(mapH, mapW, terrains, defaultTerrain);

	terrains.push(defaultTerrain);

	for (let terrain of terrains) {
		terrain.flora = generateObjectsInTerrain(terrain, map);
	}






	// every object has default repeatable, that means, that action will be executed as long as buttom pressed
	let keyMap = {
		moveUp: {
			keyCodes: [38],
			onPressed: () => {hero.moveUp()},
			onUp: () => {hero.stayUp()}
		},
		moveDown: {
			keyCodes: [40],
			onPressed: () => {hero.moveDown()},
			onUp: () => {hero.stayDown()}
		},
		moveLeft: {
			keyCodes: [37], 
			onPressed: () => {hero.moveLeft()},
			onUp: () => {hero.stayLeft()}
		},
		moveRight: {
			keyCodes: [39], 
			onPressed: () => {hero.moveRight()},
			onUp: () => {hero.stayRight()}
		},
		moveUpRight: {
			keyCodes: [38, 39], 
			onPressed: () => {hero.moveUpRight()} 
		},
		moveRightDown: {
			keyCodes: [39, 40], 
			onPressed: () => {hero.moveRightDown()} 
		},
		moveDownLeft: {
			keyCodes: [40, 37], 
			onPressed: () => {hero.moveDownLeft()} 
		},
		moveLeftUp: {
			keyCodes: [38, 37], 
			onPressed: () => {hero.moveLeftUp()} 
		},
	};


	let userControl = new UserControlManager(keyMap);

	setInterval(() => {


		let visible = getVisibleObjects(terrains, heroCoordinates);

		for (let unit of visible.flora) {

			if (unit.body.isInCollision(hero.body)) {
				console.log("SDG00");
				unit.onCollision(hero);
			}
		}


		drawMap(map, heroCoordinates);

		drawObjects(terrains, heroCoordinates, (unit) => { return unit.coordinates.getYPixels() < heroCoordinates.getYPixels() });

		let {hBounds: [topBound, bottomBound], vBounds: [leftBound, rightBound]} = getScreenBoundsInPixels(heroCoordinates);
		hero.draw(Coordinates.inPixels(
			heroCoordinates.getXPixels() - leftBound,
			heroCoordinates.getYPixels() - topBound
			));

		drawObjects(terrains, heroCoordinates, (unit) => { return unit.coordinates.getYPixels() >= heroCoordinates.getYPixels() });

	}, 1000 / FPS);
	
};


function getVisibleObjects(terrains, heroCoordinates) {
	let {hBounds: [topBound, bottomBound], vBounds: [leftBound, rightBound]} = getScreenBoundsInPixels(heroCoordinates);

	let visible = {};

	const keys = ['flora'];

	for (let key of keys) {
		visible[key] = [];
	}

	for (let terrain of terrains) {
		for (let key of keys) {

			for (let unitTypeKey in terrain[key]) {
				let units =  terrain[key][unitTypeKey];

				for (let unit of units) {

					const isVisibleToUser = isInBounds(
						unit.coordinates.getXPixels(), leftBound, rightBound, unit.coordinates.getYPixels(), topBound, bottomBound
						);

					if (isVisibleToUser) {
						visible[key].push(unit);
					}
				}
			}
		}
	}

	for (let key of keys) {
		visible[key].sort((a, b) => { 
			let diff = a.coordinates.getYPixels() - b.coordinates.getYPixels();
			if (diff == 0) {
				diff = a.view.h - b.view.h;
			}

			return diff;
		});
	}

	return visible;
}


function drawObjects(terrains, heroCoordinates, isVisibleDecider) {
	let {hBounds: [topBound, bottomBound], vBounds: [leftBound, rightBound]} = getScreenBoundsInPixels(heroCoordinates);

	let drawwable = [];

	for (let terrain of terrains) {
		for (let unitTypeKey in terrain.flora) {
			let units = terrain.flora[unitTypeKey];

			for (let unit of units) {

				const isVisibleToUser = isInBounds(
					unit.coordinates.getXPixels(), leftBound, rightBound, unit.coordinates.getYPixels(), topBound, bottomBound
					);

				if (isVisibleToUser && isVisibleDecider(unit)) {
					drawwable.push(unit);
				}
			}
		}
	}

	// set an order to prevent a collision
	drawwable.sort((a, b) => { 
		let diff = a.coordinates.getYPixels() - b.coordinates.getYPixels();
		if (diff == 0) {
			diff = a.view.h - b.view.h;
		}

		return diff;
	});

	for (let unit of drawwable) {
		let x = unit.coordinates.getXPixels();
		let y = unit.coordinates.getYPixels();

		unit.draw(Coordinates.inPixels(x - leftBound, y - topBound));
	}

}



function builtTerrain(terrain, map) {
	const x = terrain.coordinates.getXChanks();
	const y = terrain.coordinates.getYChanks();

	// map is rectangle so:
	const xSize = map[0].length - 1;
	const ySize = map.length - 1;

	let generateStep = () => { return Random.getIntInRange(-1, 1); }
	// TODO: built an step generator based in normal distribution with E(X) = 0;

	let isMoveHorizontal = () => { return Random.getBool(); };

	let fitInterval = (val, min, max) => { 
		if (val < min) {
			return min;
		} else if (val > max) {
			return max;
		}

		return val;
	}

	map[y][x] = new Chank({terrain}); // terrain center;

	for (let i = terrain.area - 1; i >= 0; i--) {

		let cX = x;
		let cY = y;

		while ( map[cY][cX].terrain === terrain ) {

			if (isMoveHorizontal()) {	// prevent diagonal movements
				cX += generateStep();
				cX = fitInterval(cX, 0, xSize);
			} else {
				cY += generateStep();
				cY = fitInterval(cY, 0, ySize);
			}

		}

		map[cY][cX] = new Chank({terrain});
	}
}



function generateDefaultMap(height, width, defaultTerrain) {
	let map = []
	for (var y = 0; y < height ; y++) {
		let row = [];

		for (var x = 0; x < width; x++) {

			let options = {terrain: defaultTerrain};

			row.push(new Chank(options));
		}

		map.push(row);
	}

	return map;
}


function generateObjectsInTerrain(terrain, map) {
	const floraDescr = terrain.floraDescr;
	let flora = {};

	for (let unitKey in floraDescr) {
		let unit = floraDescr[unitKey];

		const n = Random.getIntInRange(unit.min, unit.max);

		flora[unitKey] = [...generateObjects(terrain, map, unit.unitFactory, unit.view, n)];
	}

	return flora;
}


function *generateObjects(terrain, map, factory, view, n) {

	const terrainArea = terrain.area || mapH * mapW;
	// terrain generates randomly from epicenter, so statistically it tend to be round;
	const radius = Math.sqrt(terrainArea / Math.PI); 


	const cX = terrain.coordinates.getXChanks();
	const cY = terrain.coordinates.getYChanks();

	for (let i = 0; i < n; i++) {

		const hBounds = fitIntervalToBoundsWithShift(cX, radius*2, 0, mapW - 1);
		const vBounds = fitIntervalToBoundsWithShift(cY, radius*2, 0, mapH - 1);

		let x;
		let y;

		do {
			x = Random.getIntInRange(...hBounds);
			y = Random.getIntInRange(...vBounds);
		} while(map[y][x].terrain !== terrain);


		yield factory(Coordinates.inChanks(x, y));
	}
}


function makeMap(height, width, terrains, defaultTerrain) {

	let map = generateDefaultMap(height, width, defaultTerrain);

	for (let terrain of terrains) {
		builtTerrain(terrain, map);
	}

	return map;
}


function drawMap(map, heroCoordinates) {

	let {hBounds: [topBound, bottomBound], vBounds: [leftBound, rightBound]} = getScreenBoundsInPixels(heroCoordinates);


	for (let i = Coordinates.yPixelToChanks(topBound); i < Coordinates.yPixelToChanks(bottomBound); i++) {
		for (let j = Coordinates.xPixelToChanks(leftBound); j < Coordinates.xPixelToChanks(rightBound); j++) {
			let chank = map[i][j];

			const x = Coordinates.xChanksToPixels(j) - leftBound;
			const y = Coordinates.yChanksToPixels(i) - topBound;

			chank.draw(Coordinates.inPixels(x, y));
		}
	}
}



// returns coordinates of bounds in pixels, that visible to user
function getScreenBoundsInPixels(heroCoordinates) {
	let [topBound, bottomBound] = fitIntervalToBoundsWithShift(
		heroCoordinates.getYPixels(), 2*hScreenPixelsRadius, 0, Coordinates.xChanksToPixels(mapH - 1)
		);


	let [leftBound, rightBound] = fitIntervalToBoundsWithShift(
		heroCoordinates.getXPixels(), 2*vScreenPixelsRadius, 0, Coordinates.xChanksToPixels(mapW - 1)
		);

	topBound = Math.floor(topBound);
	bottomBound = Math.ceil(bottomBound);
	leftBound = Math.floor(leftBound);
	rightBound = Math.ceil(rightBound);


	return {hBounds: [topBound, bottomBound], vBounds: [leftBound, rightBound]};
}







