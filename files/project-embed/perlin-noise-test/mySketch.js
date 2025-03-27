let noiseVal, noiseScale = 0.011;

function setup() {
	createCanvas(500, 500);
	background(0);
	perl();
}

function draw() {
}

function perl() {
	for(let n = 0; n < width; n++) {
		for(let i = 0; i < height; i++) {
			noiseVal = noise(n * noiseScale, i * noiseScale);//finds the value of the pixel
      let ncol = color(noiseVal * 255);//converts the noise value into a grey shade
			stroke(ncol);
			point(n, i);
		}
	}
}