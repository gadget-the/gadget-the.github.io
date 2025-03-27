let noiseVal, seed = 0, mapSize = 0;
const noiseScale = 0.011;
let white, black, grey, rck, pink;

function setup() {
	createCanvas(500, 500);
	background(0);
	
	white = color(255, 255, 255);
	black = color(0, 0, 0);
	grey = color(150, 150, 150);
	rck = color(255, 0, 0);
	pink = color(255, 102, 204);
	mapSize = width * 0.7;
	//print(pink);
	//print(get(250, 250));
	//print(color(get(250, 250)));
	
	seed = round(random(0, 100));
	noiseSeed(seed);//sets seed for the perlin noise
  print(seed);
  noiseDetail(6, 0.5);
	
	perl();
	gradFil();
	blockFil();
	colFil();
}

function draw() {
}

function perl() {
	for(let n = 0; n < width; n++) {
		for(let i = 0; i < height; i++) {
			noiseVal = noise(n * noiseScale, i * noiseScale);//finds the value of the pixel
      let ncol = color(noiseVal * 255);//converts the noise value into a grey shade
			//stroke(ncol);
			//point(n, i);
			set(n, i, ncol);
		}
	}
	updatePixels();
}

function gradFil() {
	for(let n = 0; n < width; n++) {
		for(let i = 0; i < height; i++) {
			let c = get(n, i);//grabs the colour of the current pixel
			let z;
      if(dist(n, i, 250, 250) > mapSize * 0.71){
        z = black;
      } else {
        z = color(red(c) * map(dist(n, i, width/2, height/2), mapSize, 0, 0, 1.65));
      }
      if(z > white)
      {
        let z = white;
      }
      //stroke(z);
			//point(n, i);
			set(n, i, z);
    }
	}
	updatePixels();
}

function blockFil() {
	for(let n = 0; n < width; n++){
    for(let i = 0; i < height; i++){
      let c = get(n, i);//grabs the colour of the current pixel
      if(red(c) >= 0 && red(c) <= 135){//135
        set(n, i, black);//sets the pixel to black
      } else if(red(c) > 135 && red(c) <= 136){//1
        set(n, i, rck);
      } else if(red(c) > 136 && red(c) <= 140){//4
        set(n, i, grey);//sets the pixel to grey
      } else if(red(c) > 140 && red(c) <= 255){//115
        set(n, i, white);////sets the pixel to white
      }
    }
  }
  updatePixels();
}

function colFil() {
	for(let n = 0; n < width; n++){
    for(let i = 0; i < height; i++){
      noiseVal = noise(n * noiseScale, i * noiseScale);
      let gcol = color(noiseVal * 95, noiseVal * 212, noiseVal * 17);//95, 212, 17
      let wcol = color(noiseVal * 33, noiseVal * 186, noiseVal * 209);//33, 186, 209
      let dcol = color(noiseVal * 166, noiseVal * 126, noiseVal * 17);//166, 126, 17
      let rcol = color(noiseVal * 163, noiseVal * 151, noiseVal * 122);//163, 151, 122
			//let gcol = color(95, 212, 17);
      //let wcol = color(33, 186, 209);
      //let dcol = color(166, 126, 17);
      //let rcol = color(163, 151, 122);
      let c = color(get(n, i));
      if(red(c) == red(white) && green(c) == green(white) && blue(c) == blue(white)){//if the pixel is white it replaces it with a different color
        set(n, i, gcol);
      } else if(red(c) == red(rck) && green(c) == green(rck) && blue(c) == blue(rck)){//if it is red, replaces it with grey
        set(n, i, rcol);
      } else if(red(c) == red(grey) && green(c) == green(grey) && blue(c) == blue(grey)){//if it is grey, replaces it with brown
        set(n, i, dcol);
      } else if(red(c) == red(black) && green(c) == green(black) && blue(c) == blue(black)){//if it is black, replaces it with blue
        set(n, i, wcol);
      } else {
				set(n, i, pink);
			}
    }
  }
  updatePixels();
	//print('DUED!');
}