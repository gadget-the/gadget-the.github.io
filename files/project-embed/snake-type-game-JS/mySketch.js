let r;
let g;
let b;
let r2;
let g2;
let b2;
//print("R:" + r + " G:" + g + " B:" + b);
//print("R2:" + r2 + " G2:" + g2 + " B2:" + b2);
let h;
let blockX;
let blockY;
let speed;
let foodX;
let foodY;
let dir;
let score;
let on;
let aiOn;
let s;
let font;
let scores = [];

/*
function preload() {
	scores = loadStrings('highscores.txt');
}*/

function setup() {
	createCanvas(500, 500);
	r = round(random(0, 255));
	g = round(random(0, 255));
	b = round(random(0, 255));
	r2 = round(random(0, 255));
	g2 = round(random(0, 255));
	b2 = round(random(0, 255));
	h = 150;
	blockX = 250;
	blockY = 450;
	speed = 3;
	foodX = round(random(25, 470));
	foodY = round(random(25, 470));
	dir = 0;
	score = 0;
	on = false;
	aiOn = false;
	//font = loadFont('assets/inconsolata.otf');
	//textFont(font);
	if(getItem('scores') == false || getItem('scores') == [] || getItem('scores') == null || getItem('scores') == '') {
		scores = [81, 69, 22, 21, 23];
		storeItem('scores', scores);
	} else {
		scores = getItem('scores');
	}
	scores = reverse(sort(scores));
	while (scores.length > 17) {
		scores = shorten(scores);
	}
	//print(scores);

	while ((foodX % 5) != 0) {
		foodX = round(random(25, 470));
	}

	while ((foodY % 5) != 0) {
		foodY = round(random(25, 470));
	}
}

function keyPressed() {
	//console.log("key: " + key + " keyCode: " + keyCode);
	//print("key: " + key + " keyCode: " + keyCode);
	//print("X: " + blockX + " Y: " + blockY);
	//print("food x: " + foodX + " food y: " + foodY);
	if (key == 'w' || key == 'ArrowUp') {
		dir = 0;
	} else if (key == 's' || key == 'ArrowDown') {
		dir = 1;
	} else if (key == 'd' || key == 'ArrowRight') {
		dir = 2;
	} else if (key == 'a' || key == 'ArrowLeft') {
		dir = 3;
	} else if (key == ' ') {
		if (on == false) {
			on = true;
		} else {
			on = false;
		}
	} else if (key == 'n') {
		if (aiOn == false) {
			aiOn = true;
			print("AI turned on.");
		} else {
			aiOn = false;
			print("AI turned off.");
		}
	} else if (key == 'c') {
		while (scores.length > 0) {
			scores = shorten(scores);
		}
		storeItem('scores', scores);
	}
}

function mouseOut() {
	if (on) {
		on = false;
	}
}

function draw() {
	background(100);
	//ellipse(mouseX, mouseY, 20, 20);

	noStroke();

	fill(51, 127, 23);
	rect(10, 10, 480, 480);

	fill(r, g, b);
	rect(blockX - 10, blockY - 10, 20, 20);

	fill(r2, g2, b2);
	rect(foodX - 5, foodY - 5, 10, 10);

	fill(0, 0, 0);
	s = score;
	textSize(25);
	text(s, 20, 480);

	if (on) {
		if (aiOn) {
			if ((foodX - 5) > (blockX + 10)) {
				dir = 2;
			} else if ((foodX + 5) < (blockX - 10)) {
				dir = 3;
			} else if ((foodY - 5) > (blockY + 10)) {
				dir = 1;
			} else if ((foodY + 5) < (blockY - 10)) {
				dir = 0;
			}
		}

		if (dir == 0) {
			blockY -= speed;
		} else if (dir == 1) {
			blockY += speed;
		} else if (dir == 2) {
			blockX += speed;
		} else if (dir == 3) {
			blockX -= speed;
		}

		if (blockX < 20 || blockX > 480 || blockY < 20 || blockY > 480) {
			blockX = 250;
			blockY = 450;

			dir = 0;

			speed = 3;

			on = false;

			r = round(random(0, 255));
			g = round(random(0, 255));
			b = round(random(0, 255));
			r2 = round(random(0, 255));
			g2 = round(random(0, 255));
			b2 = round(random(0, 255));
			//print("R:" + r + " G:" + g + " B:" + b);
			//print("R2:" + r2 + " G2:" + g2 + " B2:" + b2);

			foodX = round(random(25, 470));
			foodY = round(random(25, 470));
			while ((foodX % 5) != 0) {
				foodX = round(random(25, 470));
			}
			while ((foodY % 5) != 0) {
				foodY = round(random(25, 470));
			}

			if (score > 0) {
				append(scores, score);
				scores = reverse(sort(scores));
				storeItem('scores', scores);
				score = 0;
			}
		}

		if (((foodX + 5) >= (blockX - 10) && (foodX - 5) <= (blockX + 10)) && ((foodY + 5) >= (blockY - 10) && (foodY - 5) <= (blockY + 10))) {
			r2 = round(random(0, 255));
			g2 = round(random(0, 255));
			b2 = round(random(0, 255));
			//print("R2:" + r2 + " G2:" + g2 + " B2:" + b2);

			score++;

			speed += 0.5;
			//print("speed: " + speed);

			foodX = round(random(25, 470));
			foodY = round(random(25, 470));
			while ((foodX % 5) != 0) {
				foodX = round(random(25, 470));
			}
			while ((foodY % 5) != 0) {
				foodY = round(random(25, 470));
			}
		}
	} else {
		dir = 0;

		fill(255, 255, 255);
		s = "Paused";
		textSize(20);
		text(s, 225, 75);

		s = "(Press Space)";
		text(s, 195, 95);

		s = "Scores:";
		textSize(15);
		text(s, 200, 115);

		scores = reverse(sort(scores));
		while (scores.length > 17) {
			scores = shorten(scores);
		}
		storeItem('scores', scores);

		for (let i = 0; i < scores.length; i++) {
			h = 135 + (20 * i);
			s = scores[i];
			textSize(15);
			text(s, 200, h);
		}
	}
}